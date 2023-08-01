import { useToJson } from '@/customHooks/useToJson';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { AddOrdenMethod } from '../../../utils/metodos/metodosOrdenes';

const AddOrdenIA = ({ addHandleOpenIa, addOpenIa, listarOrdenes }) => {
   const { chat, sendMessage, loading, setSuccess, success } = useToJson();

   useEffect(() => {
      return () => {
         if (success.mensaje) {
            setSuccess({
               mensaje: '',
               valida: true
            });
         }
      };
   }, []);

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
         // console.log(extractedText)
         await sendMessage(extractedText);
      };

      reader.readAsArrayBuffer(file);
   };

   const agregar = (e) => {
      e.preventDefault();
      if (!success.valida) {
         AddOrdenMethod({
            ord: JSON.parse(chat),
            loading: (v) => console.log(v),
            error: (msg) => console.log(msg),
            success: (res) => {
               console.log(res);
               listarOrdenes();
               addHandleOpenIa();
            },
         });
      }
   };

   return (
      <>
         {console.log(chat)}
         <Dialog open={addOpenIa} size='lg' handler={addHandleOpenIa} dismiss={{ enabled: false }}>
            <DialogHeader>Agregar Orden PDF</DialogHeader>
            <form onSubmit={agregar}>
               <DialogBody divider>
                  <div className='flex gap-2'>
                     <Input label='Seleccione Pdf' name='file' type='file' onChange={handleFileChangeIA} />
                  </div>
                  {loading ? <Typography>Creando JSON...</Typography> : null}
                  <Typography>{success.mensaje}</Typography>
               </DialogBody>
               <DialogFooter>
                  <Button variant='text' color='red' onClick={addHandleOpenIa} className='mr-1'>
                     <span>Cancel</span>
                  </Button>
                  <Button type='submit' variant='gradient' color='green' /* onClick={agregar} */ disabled={success.valida}>
                     <span>Despues de Cargar PDF Agregar</span>
                  </Button>
               </DialogFooter>
            </form>
         </Dialog>
         
      </>
   );
};

export default AddOrdenIA;
