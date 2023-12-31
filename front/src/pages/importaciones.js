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
console.log(contenedoresCont)
   return (
      <>
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto p-2'>
            <Typography variant='h1'>Importaciones</Typography>
            <div className='flex flex-row flex-wrap gap-3 justify-stretch pt-3'>
               {contenedoresCont.map((x, idx) => (
                  <Card className="w-full max-w-[16rem] cursor-pointer bg-white shadow-md rounded-lg" key={idx} color="blue" onClick={() => viewEditHandleOpenCon(x.id)}>
    <Typography variant="h6" className="text-gray-800 font-semibold mb-2">{x.nombreContenedor}</Typography>
    <Typography className="text-gray-600 mb-1">Cant. productos {x.importaciones.length}</Typography>
    <Typography className="text-gray-600 mb-1">fechaRDM {x?.fechaRDM}</Typography>
    <Typography className="text-gray-600 mb-1">tipo {x?.packageTipo}</Typography>


    {/* Additional content or styling can be added here */}
    <Button onClick={viewEditHandleOpenCon}>Ver importacion</Button>

</Card>
               ))}
             
            </div>
            <div className='flex justify-center'>
            <Button onClick={addHandleOpenCon}>Agregar nueva importacion</Button>
            </div>
            {addOpenCon && <AddImportacion addOpenCon={addOpenCon} addHandleOpenCon={addHandleOpenCon} />}
            {viewEditOpenCon && <ViewEditImportacion viewEditOpenCon={viewEditOpenCon} viewEditHandleOpenCon={viewEditHandleOpenCon} id={idCon} />}
         </div>
      </>
   );
};

export default Importaciones;
