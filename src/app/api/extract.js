import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public/uploads');
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const filePath = files.file.path;
    try {
      const fileContent = await readFile(filePath, 'utf-8');
      return res.status(200).json(fileContent);
    } catch (readError) {
      console.error('Error reading file:', readError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}
