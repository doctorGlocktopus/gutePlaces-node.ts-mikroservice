import express from 'express';
import path from 'path';
import connectDB from './config/db';

const app = express();

// Verbindung zur Datenbank herstellen
connectDB();

// Statische Dateien aus dem 'public' Verzeichnis bereitstellen
app.use(express.static(path.join(__dirname, '../public')));

// Route für die Root-URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Beispiel-API-Route
app.get('/api/plz/search', (req, res) => {
  res.json({ message: 'API ist erreichbar' });
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
