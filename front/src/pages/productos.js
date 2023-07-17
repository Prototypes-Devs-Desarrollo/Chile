import AddProducto from '@/components/productForm/AddProducto';
import { Button, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const productos = () => {
   const [addOpenPro, setAddOpenPro] = useState(false);
   const addHandleOpenPro = () => setAddOpenPro(!addOpenPro);

   return (
      <>
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto'>
         <Typography variant="h1">Productos</Typography>
            <Button onClick={addHandleOpenPro}>Agregar</Button>
         </div>
         {addOpenPro && <AddProducto addHandleOpenPro={addHandleOpenPro} addOpenPro={addOpenPro} />}
      </>
   );
};

export default productos;
