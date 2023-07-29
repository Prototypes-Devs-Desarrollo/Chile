import { ProviderList } from '@/components/providerForm/ProviderList';
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, Typography, Button } from '@material-tailwind/react';
import AddProvider from '@/components/providerForm/AddProvider';

const Proveedores = () => {
   
   const [addProv, setAddProv] = useState(false);
   const addHandleProd = () => setAddProv(!addProv);

   // useEffect(()=>{

   // }, [])

   const addHandleProv = () => setAddProv(!addProv);

   return (
      <>
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
            <Typography variant='h1'>Proveedores</Typography>
            <ProviderList/>
         </div>
         {addProv && <AddProvider addOpenProv={addProv} addHandleOpenProv={addHandleProd} />}
      </>
   );
};

export default Proveedores;