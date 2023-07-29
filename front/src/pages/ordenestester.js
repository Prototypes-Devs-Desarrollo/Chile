import { useToJson } from '@/customHooks/useToJson';
import { Button, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';

const Odenestester = () => {
   const canvasRef = useRef(null);
   const [texto, setTexto] = useState('');
   const { sendMessage, chat } = useToJson();

   const [pdfContent, setPdfContent] = useState('');

   const handleFileChange = async (event) => {
      const pdfJS = await import('pdfjs-dist/build/pdf');
      pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js';
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
         const contents = e.target.result;
         const pdf = await pdfJS.getDocument(contents).promise;
         const pages = await pdf.getPage(1);
         let extractedText = '';

         const textContent = await pages.getTextContent();
         console.log(textContent);
         const pageText = textContent.items
            .map((item, idx) => {
               if (item.str == 'ORDEN DE COMPRA') {
                  console.log(idx, item.str);
               }
               if (item.str == 'Fecha emisión:') {
                  console.log(idx, item.str);
               }
               if (item.str == 'Señor(es):') {
                  console.log(idx, item.str);
               }
               if (item.str == 'RUT:') {
                  console.log(idx, item.str);
               }
               if (item.str == 'Dirección:') {
                  console.log(idx, item.str);
               }
               if (item.str == 'Comuna:') {
                  console.log(idx, item.str);
               }
               if (item.str == 'Giro:') {
                  console.log(idx, item.str);
               }
               return item.str;
            })
            .join(' ');
         extractedText += pageText;

         setPdfContent(extractedText);
      };

      reader.readAsArrayBuffer(file);
   };

   const handleFileChangeIA = async (event) => {
      const pdfJS = await import('pdfjs-dist/build/pdf');
      pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js';
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
         const contents = e.target.result;
         const pdf = await pdfJS.getDocument(contents).promise;
         const pages = await pdf.getPage(1);
         let extractedText = '';

         const textContent = await pages.getTextContent();
         console.log(textContent);
         const pageText = textContent.items.map((item) => item.str).join(' ');
         extractedText += pageText;

         setPdfContent(extractedText);
         await sendMessage(extractedText);
      };

      reader.readAsArrayBuffer(file);
   };

   const test = async () => {
      const pdfJS = await import('pdfjs-dist/build/pdf');
      let aux = '';
      pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js';
      const pdf = await pdfJS.getDocument('envio.pdf').promise;

      // const page = await pdf.getPage(1);
      await pdf.getPage(1).then(async function (page) {
         // you can now use *page* here
         const listaText = await page.getTextContent();
         console.log(listaText);
         listaText.items.forEach((element) => {
            // aux = aux + element.str;
            if (element.hasEOL) {
               // console.log(aux + element.str)
               // setTexto(aux + element.str)
               aux = aux + ' ' + element.str;
            } else {
               // setTexto(aux + element.str + '\n')
               // console.log(aux + element.str + '\n')
               aux = aux + element.str + '\n';
            }
            // console.log(aux)
         });
      });
      console.log(aux);
      setTexto(aux);
      // sendMessage(aux)
      // console.log(pdf)
      // const viewport = page.getViewport({ scale: 1.5 });

      // // Prepare canvas using PDF page dimensions.
      // const canvas = canvasRef.current;
      // const canvasContext = canvas.getContext('2d');
      // canvas.height = viewport.height;
      // canvas.width = viewport.width;

      // // Render PDF page into canvas context.
      // const renderContext = { canvasContext, viewport };
      // page.render(renderContext);
   };

   return (
      <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
         {console.log(texto)}
         {console.log(chat)}
         <Typography variant='h1'>Odenes de Compras</Typography>
         <p>en Construccion</p>
         <Button onClick={test}>test</Button>
         <Typography>{pdfContent}</Typography>
         <Typography variant='h1'>Text</Typography>
         <input type='file' onChange={handleFileChange} />
         {/* <canvas ref={canvasRef} style={{ height: '100vh' }} /> */}
         <Typography variant='h1'>IA</Typography>
         <input type='file' onChange={handleFileChangeIA} />
      </div>
   );
};

export default Odenestester;
