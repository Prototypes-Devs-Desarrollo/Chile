import { useToJson } from '@/customHooks/useToJson';
import { Button, Typography } from '@material-tailwind/react';
// import pdfdir from '../envio.pdf'
import React, { useEffect, useRef, useState } from 'react';

const odenesdecompras = () => {
   const canvasRef = useRef(null);
   const [texto, setTexto] = useState('');
   const { sendMessage, chat } = useToJson()

   // useEffect(() => {
   //    (async function () {
   //       // We import this here so that it's only loaded during client-side rendering.
   //       const pdfJS = await import('pdfjs-dist/build/pdf');
   //       pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js';
   //       const pdf = await pdfJS.getDocument('envio.pdf').promise;
   //       console.log(pdf)

   //       const page = await pdf.getPage(1);
   //       const viewport = page.getViewport({ scale: 1.5 });

   //       // Prepare canvas using PDF page dimensions.
   //       const canvas = canvasRef.current;
   //       const canvasContext = canvas.getContext('2d');
   //       canvas.height = viewport.height;
   //       canvas.width = viewport.width;

   //       // Render PDF page into canvas context.
   //       const renderContext = { canvasContext, viewport };
   //       page.render(renderContext);
   //    })();
   // }, []);

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
            if(element.hasEOL){
               // console.log(aux + element.str)
               // setTexto(aux + element.str)
               aux = aux + element.str;
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
      sendMessage(aux)
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
         {console.log(chat)}
         <Typography variant='h1'>Odenes de Compras</Typography>
         <p>en Construccion</p>
         <Button onClick={test}>test</Button>
         <Typography>{texto}</Typography>
         {/* <canvas ref={canvasRef} style={{ height: '100vh' }} /> */}
      </div>
   );
};

export default odenesdecompras;
