import { run } from '../../../scripts/ingest-data';
import path from "path";
import formidable from "formidable";
import fs from 'fs/promises'

export const config = {
   api: {
      bodyParser: false,
   },
};

const readFile = (req, saveLocally) => {
   const options = {};
   if (saveLocally) {
      options.uploadDir = path.join(process.cwd(), 'docs');
      options.filename = (name, ext, path, form) => {
         return Date.now().toString() + '_' + path.originalFilename;
      };
   }
   options.maxFileSize = 4000 * 1024 * 1024;
   const form = formidable(options);
   return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
         if (err) reject(err);
         resolve({ fields, files });
      });
   });
};

export default async function handler(req, res) {
   try {
      // console.error(req)
      const { files } = await readFile(req, true);
      await run();
      // await fs.unlink(`${files.pdf[0].filepath}`);
      res.status(200).json({ message: 'Ingestion complete' });
   } catch (error) {

      console.log(error)
      res.status(500).json({ error: 'Failed to ingest data', e: error.message, er: error });
   }
}
