import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, Typography, Button } from '@material-tailwind/react';
import AddProvider from '@/components/providerForm/AddProvider';

const proveedores = () => {
   
   const [addProv, setAddProv] = useState(false);

   useEffect(()=>{

   }, [])

   const addHandleProv = () => setAddProv(!addProv);

   return (
      <>
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
            <Typography variant='h1'>Proveedores</Typography>
            <Button onClick={addHandleProv}>Agregar</Button>
         </div>
         {addProv && <AddProvider addProv={addProv} addHandleProv={addHandleProv} />}
      </>
   );
};

export default proveedores;