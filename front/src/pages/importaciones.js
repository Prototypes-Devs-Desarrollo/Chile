import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, Typography, Button, CardBody } from '@material-tailwind/react';
import AddImportacion from '@/components/importForm/AddImportacion';
import { useContenedores } from '@/customHooks/useContenedores';
import { contSetError, contSetSuccess } from '@/redux/reducer/reducerContenedor';
import ViewEditImportacion from '@/components/importForm/ViewEditImportacion';

const Importaciones = () => {
   const [addOpenCon, setAddOpenCon] = useState(false);
   const [viewEditOpenCon, setViewEditOpenCon] = useState(false);
   const addHandleOpenCon = () => setAddOpenCon(!addOpenCon);
   const viewEditHandleOpenCon = (id) => {
      setIdCon(id);
      setViewEditOpenCon(!viewEditOpenCon);
   };

   const [idCon, setIdCon] = useState('');

   const { cardsCon, errorCont, successCont, loadingCont, contenedoresCont, onClickCardsCon, onUseEffectCon, dispatch } = useContenedores();

   useEffect(() => {
      if (contenedoresCont.length == 0) {
         onUseEffectCon();
      }
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
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto p-2'>
            <Typography variant='h1'>Importaciones</Typography>
            <Button onClick={addHandleOpenCon}>Agregar</Button>
            <div className='flex flex-row flex-wrap gap-3 justify-stretch pt-3'>
               {contenedoresCont.map((x, idx) => (
                  <Card className='w-full max-w-[16rem] cursor-pointer' key={idx} color='blue' onClick={() => viewEditHandleOpenCon(x.id)}>
                     <CardBody>
                        <Typography>{x.nombreContenedor}</Typography>
                        <Typography>Cant. Importaciones {x.importaciones.length}</Typography>
                        {/* <Typography>Total {x.importaciones.map()}</Typography> */}
                     </CardBody>
                  </Card>
               ))}
            </div>
            {addOpenCon && <AddImportacion addOpenCon={addOpenCon} addHandleOpenCon={addHandleOpenCon} />}
            {viewEditOpenCon && <ViewEditImportacion viewEditOpenCon={viewEditOpenCon} viewEditHandleOpenCon={viewEditHandleOpenCon} id={idCon} />}
         </div>
      </>
   );
};

export default Importaciones;
