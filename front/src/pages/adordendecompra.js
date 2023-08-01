import { ProviderList } from '@/components/providerForm/ProviderList';
import React, { useEffect, useState } from 'react';
import AddProvider from '@/components/providerForm/AddProvider';
import { AddOrden } from '@/components/oredenForm/AddOrden';

const Proveedores = () => {
   



   return (
      <>
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
<AddOrden/>

         </div>
      </>
   );
};

export default Proveedores;