import React, { useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography } from '@material-tailwind/react';
import { useImportForm } from '@/customHooks/useImportForm';
import AddProducto from '../productForm/AddProducto';

const AddImportacion = ({ addHandleOpenImp, addOpenImp }) => {
   const { input, setInput } = useImportForm();
   const [addOpenPro, setAddOpenPro] = useState(false);
   const addHandleOpenPro = () => setAddOpenPro(!addOpenPro);

   return (
      <>
         <Dialog open={addOpenImp} size='xxl' handler={addHandleOpenImp} dismiss={{ enabled: false }}>
            <DialogHeader>Agregar Importacion</DialogHeader>
            <form>
               <DialogBody divider>
                  <div className='flex gap-2'>
                     <Input label='Nombre' type='text' />
                     <Input label='Fecha RDM' type='date' />
                     <Input label='Fecha EDC' type='date' />
                     <Input label='Importacion Tipo' type='text' />
                     <Input label='Package Tipo' type='text' />
                  </div>
               </DialogBody>
               <DialogBody>
                  <Typography className='flex items-center shrink-0 text-blue-gray-900 antialiased font-sans text-xl font-semibold leading-snug'>Productos</Typography>
                  <Button onClick={addHandleOpenPro}>Agregar Producto</Button>
                  <div className='flex gap-2'>
                     {input.productos.map((x) => (
                        <p>{x.name}</p>
                     ))}
                  </div>
               </DialogBody>
               <DialogFooter>
                  <Button variant='text' color='red' onClick={addHandleOpenImp} className='mr-1'>
                     <span>Cancel</span>
                  </Button>
                  <Button variant='gradient' color='green' onClick={addHandleOpenImp}>
                     <span>Agregar</span>
                  </Button>
               </DialogFooter>
            </form>
            {addOpenPro && <AddProducto addHandleOpenPro={addHandleOpenPro} addOpenPro={addOpenPro} />}
         </Dialog>
      </>
   );
};

export default AddImportacion;
