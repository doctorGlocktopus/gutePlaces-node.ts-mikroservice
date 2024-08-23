import express from 'express';
import path from 'path';
import searchRouter from './api/search';

const app = express();
const port = 3000;

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', searchRouter);

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
