import axios from "axios";
import { useState } from "react";

export const useToJson = () => {
  const [chat, setChat] = useState([]);
  const api = "";

  const sendMessage = async (message) => {
    try {
      const prompt = `${message}
      Este texto pertenece a una orden de compra para una importación de un producto. Crea un objeto en formato JSON con los campos y valores de la orden de compra. Recuerda que "Señores" es el proveedor y "SASFA GROUP SPA" es el cliente. Necesito en el objeto tener todos los datos relevantes como producto, cantidad y precio unitario.`;
      

      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: 'text-davinci-003',
          prompt,
          temperature: 1,
          max_tokens: 1500, // Set a higher value for more tokens in the response
          top_p: 1.0,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
          stop: ["You:"],
          n: 1, // Limitar la respuesta a 1
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api}`,
          },
        }
      );

      // const botResponse = response.data.choices[0].text.trim();
      // console.log(response.data)
      setChat(response.data.choices[0].text)
      // const jsonData = JSON.parse(botResponse);

      // Solo setea el objeto JSON devuelto por el bot en el estado chat
      // setChat([...chat, jsonData]);
      return jsonData;
    } catch (error) {
      // Maneja los errores de la petición, si los hay
      console.error("Error en la entrevista laboral:", error);
      return null;
    }
  };

  return {
    chat,
    sendMessage,
  };
};