

import { PineconeClient } from '@pinecone-database/pinecone';

let pinecone = null;

async function initPinecone() {
  try {
    const client = new PineconeClient();

    await client.init({
      environment: "us-west1-gcp-free",  // This value comes from the dashboard
      apiKey: "1a5edc6f-f63f-4778-a887-877eda8e33c3"
    });

    return client;
  } catch (error) {
    console.error('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

export async function getPineconeClient() {
  if (!pinecone) {
    pinecone = await initPinecone();
  }
  return pinecone;
}