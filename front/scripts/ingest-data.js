import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
// import { pinecone } from '../utils/pinecone-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
// import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '../../Client/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

import { PineconeClient } from '@pinecone-database/pinecone';

// const pinecone = new PineconeClient();

// await pinecone.init({
//    environment: 'us-west4-gcp',
//    apiKey: 'ccf577be-db70-4213-8e39-ffaafd96ba30',
// });

/* Name of directory to retrieve your files from 
   Make sure to add your PDF files inside the 'docs' folder
*/
const filePath = 'docs';

export const run = async (filePath) => {
   try {

    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: 'us-west4-gcp', //this is in the dashboard
      apiKey: 'ccf577be-db70-4213-8e39-ffaafd96ba30',
    });

      /*load raw docs from the all files in the directory */
      const directoryLoader = new DirectoryLoader(filePath, {
         '.pdf': (path) => new PDFLoader(path),
      });

      // const loader = new PDFLoader(filePath);
      const rawDocs = await directoryLoader.load();

      /* Split text into chunks */
      const textSplitter = new RecursiveCharacterTextSplitter({
         chunkSize: 1000,
         chunkOverlap: 200,
      });

      const docs = await textSplitter.splitDocuments(rawDocs);
      console.error('split docs', docs);

      /*create and store the embeddings in the vectorStore*/
      const embeddings = new OpenAIEmbeddings();
      const indexesList = await pinecone.listIndexes();
      const index = await pinecone.Index('foro');
      
      await PineconeStore.fromDocuments(docs, embeddings, {
         pineconeIndex: index,
         namespace: 'foro',
         textKey: 'text',
      });
   } catch (error) {
      console.error('error', error);
   }
};

(async () => {
   await run();
   console.error('ingestion complete');
})();

