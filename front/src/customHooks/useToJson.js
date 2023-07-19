import axios from "axios";
import { useState } from "react";

export const useToJson = () => {
  const [chat, setChat] = useState([]);
  const api = "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";

  const sendMessage = async (message) => {
    try {
      const prompt = `${message}
      Esto es una orden de compra, conviértelo en un JSON con la siguiente estructura:

      productos = {
        nombre: "Nombre del producto",
        proveedor: {
          nombre: "Nombre del proveedor",
          direccion: "Dirección del proveedor",
        },
        cantidad: "Cantidad del producto",
        precioUnitario: "Precio unitario del producto",
        // Agrega aquí todos los datos proporcionados
      }`;

      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt,
          temperature: 0.5,
          max_tokens: 60,
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
      console.log(response.data)
      const jsonData = JSON.parse(botResponse);

      // Solo setea el objeto JSON devuelto por el bot en el estado chat
      setChat([...chat, jsonData]);
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