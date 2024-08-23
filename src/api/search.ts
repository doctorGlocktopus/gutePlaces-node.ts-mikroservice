import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

type CsvRecord = {
  plz: string;
  stadt: string;
};

const router = express.Router();

router.get('/search', async (req: Request, res: Response) => {
  const plz = req.query.plz as string;
  const stadt = req.query.stadt as string;

  if (!plz && !stadt) {
    return res.status(400).json({ error: 'Bitte eine PLZ oder Stadt angeben' });
  }

  const filePath = path.join(process.cwd(), 'src/data/plz.csv');  // Pfadkorrektur hier
  const results: CsvRecord[] = [];

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';', headers: ['plz', 'stadt'] }))
    .on('data', (data: CsvRecord) => {
      if (plz && data.plz.startsWith(plz)) {
        results.push(data);
      } else if (stadt && data.stadt.toLowerCase() === stadt.toLowerCase()) {
        results.push(data);
      }
    })
    .on('end', () => {
      res.json(results);
    })
    .on('error', (error) => {
      res.status(500).json({ error: 'Fehler beim Lesen der CSV-Datei' });
    });
});

export default router;