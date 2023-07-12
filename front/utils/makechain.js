import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_PROMPT = `Dada la siguiente conversación y una pregunta de seguimiento, reformula la pregunta de seguimiento para que sea una pregunta independiente.

Historial del chat:
{chat_history}
Pregunta de seguimiento: {question}
Pregunta independiente:`;

const QA_PROMPT = `Eres un analista de futbol de IA útil. Utiliza los siguientes fragmentos de contexto para responder sobre lo que tu supones que resultara el partido de futbol.
Si no conoces la respuesta, inventa una historia
Si la pregunta no está relacionada con el contexto, responde cortésmente que solo estás sintonizado para responder preguntas relacionadas con el contexto.

{context}

Pregunta: {question}
Respuesta útil en formato Markdown:`;

export const makeChain = (vectorstore) => {
  const model = new OpenAI({
    temperature: 0, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
