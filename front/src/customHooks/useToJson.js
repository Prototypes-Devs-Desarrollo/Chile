import axios from 'axios';
import { useState } from 'react';

const s = {
   mensaje: '',
   valida: true,
};

export const useToJson = () => {
   const [chat, setChat] = useState('');
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(s);
   const api = 'PONER API KEY DE IA';
   
   const sendMessage = async (message) => {
      setLoading(true);
      try {
         const prompt = `"${message}" 
         Según el texto anterior que es una orden de compra de una importación de productos, necesito que me crees un objeto JSON con los campos y valores que te proporciono al final de este texto. Recuerda que “Señor(es):” es el proveedor y en el principio del texto esta el cliente. 
         {
          "cliente": {
              "nombreEmpresa": "",
              "rut": "",
              "giro": "",
              "direccion": "",
              "email": "",
              "telefono": ""
          },
          "proveedor": {
              "nombreEmpresa": "",
              "rut": "",
              "direccion": "",
              "comuna": "",
              "giro": "",
              "ciudad": "",
              "contacto": ""
          },
          "ordenCompra": {
              "numero": "",
              "fechaEmision": "",
              "formaPago": "",
              "fechaEntrega": "",
              "moneda": "",
              "solicitante": ""
          },
          "productos": [
              {
                  "codigo": "",
                  "descripcionProducto": "",
                  "cantidadSolicitada": "",
                  "precioUnitario": "",
                  "descuento": "",
                  "recargo": "",
                  "aFeX": "",
                  "valor": ""
              },
              {
                  "codigo": "",
                  "descripcionProducto": "",
                  "cantidadSolicitada": "",
                  "precioUnitario": "",
                  "descuento": "",
                  "recargo": "",
                  "aFeX": "",
                  "valor": ""
              }
          ],
          "subTotal": "",
          "descuentoGlobal": "",
          "montoNeto": "",
          "montoExento": "",
          "iva": "",
          "total": "",
          "observacionesGenerales": "",
          "observacionesPago": ""
      }`;

         const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
               model: 'gpt-3.5-turbo',
               messages: [{ role: 'user', content: prompt }],
               temperature: 1.0,
               max_tokens: 2000, // Set a higher value for more tokens in the response
               top_p: 1.0,
               stop: ['You:'],
               n: 1, // Limitar la respuesta a 1
            },
            {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${api}`,
               },
            }
         );

         console.log(response);
         setChat(response.data.choices[0].message.content);
         setSuccess({ ...success, valida: false });
         setLoading(false);
      } catch (err) {
         console.log('sendMessage', err);
         setSuccess({ mensaje: err.message, valida: true });
         setLoading(false);
      }
   };

   return {
      chat,
      sendMessage,
      loading,
      success,
      setSuccess,
   };
};

const initial = {
   cliente: {
      nombreEmpresa: '',
      rut: '',
      giro: '',
      direccion: '',
      email: '',
      telefono: '',
   },
   proveedor: {
      nombreEmpresa: '',
      rut: '',
      direccion: '',
      comuna: '',
      giro: '',
      ciudad: '',
      contacto: '',
   },
   ordenCompra: {
      numero: '',
      fechaEmision: '',
      formaPago: '',
      fechaEntrega: '',
      moneda: '',
      solicitante: '',
   },
   productos: [
      {
         codigo: '',
         descripcionProducto: '',
         cantidadSolicitada: '',
         precioUnitario: '',
         descuento: '',
         recargo: '',
         aFeX: '',
         valor: '',
      },
      {
         codigo: '',
         descripcionProducto: '',
         cantidadSolicitada: '',
         precioUnitario: '',
         descuento: '',
         recargo: '',
         aFeX: '',
         valor: '',
      },
   ],
   subTotal: '',
   descuentoGlobal: '',
   montoNeto: '',
   montoExento: '',
   iva: '',
   total: '',
   observacionesGenerales: '',
   observacionesPago: '',
};
