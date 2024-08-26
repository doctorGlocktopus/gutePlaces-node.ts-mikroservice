import express from 'express';
import path from 'path';
import connectDB from './config/db';

const app = express();

const db = connectDB();

const requestCache: { [key: string]: number } = {};

async function getCollection() {
  const db = await connectDB();
  const collection = db.connection.db.collection('plz');
  return collection;
}

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/search',   
 async (req, res) => {
    const { plz, stadt } = req.query;

    const clientIp = req.ip || Math.random();

    const currentTime = Date.now();

    if (requestCache[clientIp] && currentTime - requestCache[clientIp] < 5000) {
        return res.status(429).json({ error: 'Bitte warten Sie 5 Sekunden vor dem nächsten Aufruf' });
    }

    if (!plz && !stadt) {
        return res.status(400).json({ error: 'Bitte eine PLZ oder Stadt angeben' });
    }

    try {
        let query: any = {};

        if (plz) {
          query.plz = new RegExp("^" + plz, 'i');
        }

        if (stadt) {
          query.stadt = new RegExp("^" + stadt, 'i');
        }

        const collection = await getCollection();

        const results = await collection.find(query).toArray();
        res.json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Fehler bei der Datenabfrage' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));