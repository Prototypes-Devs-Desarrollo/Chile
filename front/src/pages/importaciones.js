import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, Typography, Button } from '@material-tailwind/react';
import AddImportacion from '@/components/importForm/AddImportacion';

const importaciones = () => {
   
   const [addOpenImp, setAddOpenImp] = useState(false);

   useEffect(()=>{

   }, [])

   const addHandleOpenImp = () => setAddOpenImp(!addOpenImp);

   return (
      <>
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
            <Typography variant='h1'>Importaciones</Typography>
            <Button onClick={addHandleOpenImp}>Agregar</Button>
         </div>
         {addOpenImp && <AddImportacion addOpenImp={addOpenImp} addHandleOpenImp={addHandleOpenImp} />}
      </>
   );
};

export default importaciones;
