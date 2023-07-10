import { useState } from "react";
import axios from "axios";
import { getPineconeClient } from "../../utils/pinecone-client";

export const useChatGpt = () => {
  const [gptAnswer, setGptAnswer] = useState("");

  const sendToGpt = async (inputValue) => {
    try {

      const client = await getPineconeClient();
      const response = await axios.post("/api/chat", { 
        question: inputValue,
        client: client,
      });
      const data = response.data;
      setGptAnswer(data);
    } catch (error) {
      console.log("error useChatGpt.jsx ",error);
    }
  };

  return {
    sendToGpt,
    gptAnswer,
    setGptAnswer,
  };
};