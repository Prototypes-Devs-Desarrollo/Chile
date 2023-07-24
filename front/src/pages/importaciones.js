import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, Typography, Button } from '@material-tailwind/react';
import AddImportacion from '@/components/importForm/AddImportacion';
import { useContenedores } from '@/customHooks/useContenedores';
import { contSetError, contSetSuccess } from '@/redux/reducer/reducerContenedor';

const importaciones = () => {
   const [addOpenCon, setAddOpenCon] = useState(false);
   const addHandleOpenCon = () => setAddOpenCon(!addOpenCon);

   const { cardsCon, errorCont, successCont, loadingCont, contenedoresCont, onClickCardsCon, onUseEffectCon, dispatch } = useContenedores();

   useEffect(() => {
      onUseEffectCon();
   }, []);

   useEffect(() => {
      return () => {
         if (errorCont) {
            dispatch(contSetError(''));
         }
      };
   }, [errorCont]);

   useEffect(() => {
      return () => {
         if (successCont) {
            dispatch(contSetSuccess(''));
         }
      };
   }, [successCont]);

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
