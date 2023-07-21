import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, Typography, Button } from '@material-tailwind/react';
import AddImportacion from '@/components/importForm/AddImportacion';
import { useContenedores } from '@/customHooks/useContenedores';

const importaciones = () => {
   const [addOpenCon, setAddOpenCon] = useState(false);
   const addHandleOpenCon = () => setAddOpenCon(!addOpenCon);

   const { cardsCon, errorCon, successCon, loadingCon, contenedoresCont, onClickCardsCon, onUseEffectCon, setSuccessCon, setErrorCon } = useContenedores();

   useEffect(() => {
      onUseEffectCon();
   }, []);

   useEffect(() => {
      return () => {
         if (errorCon) {
            setErrorCon('');
         }
      };
   }, [errorCon]);

   useEffect(() => {
      return () => {
         if (successCon) {
            setSuccessCon('');
         }
      };
   }, [successCon]);

   return (
      <>
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
            <Typography variant='h1'>Importaciones</Typography>
            <Button onClick={addHandleOpenCon}>Agregar</Button>
            {contenedoresCont.map((x, idx) => (
               <p key={idx}>{x.nombreContenedor}</p>
            ))}
         </div>
         {addOpenCon && <AddImportacion addOpenCon={addOpenCon} addHandleOpenCon={addHandleOpenCon} />}
      </>
   );
};

export default importaciones;
