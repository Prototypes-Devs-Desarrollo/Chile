import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
// import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '../../../../Client/config/pinecone';
import { getPineconeClient } from '../../../utils/pinecone-client';
import { makeChain } from '../../../utils/makechain';

export default function handler(req, res) {
   const { question, history } = req.body;
   if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
   }

   if (!question) {
      return res.status(400).json({ message: 'No question in the request' });
   }

   const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

   getPineconeClient()
      .then((pinecone) => {
         const index = pinecone.Index('PINECONE_INDEX_NAME');
         return PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
            pineconeIndex: index,
            textKey: 'text',
            namespace: 'PINECONE_NAME_SPACE',
         });
      })
      .then((vectorStore) => {
         return makeChain(vectorStore);
      })
      .then((chain) => {
         return chain.call({
            question: sanitizedQuestion,
            chat_history: history || [],
         });
      })
      .then((response) => {
         res.status(200).json(response.text);
      })
      .catch((error) => {
         console.error('error', error);
         res.status(500).json({ error: error.message || 'Something went wrong' });
      });
}
