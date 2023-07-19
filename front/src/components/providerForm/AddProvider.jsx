import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography } from '@material-tailwind/react';
import AddProducto from '../productForm/AddProducto';
import { useProvForm } from '@/customHooks/useProvForm';

const AddProvider = ({ addHandleOpenProv, addOpenProv}) => {
    const { input, setInput } = useProvForm();
  const [productos, setProductos] = useState(false);
  const addHandleProd = () => setProductos(!productos);
 
    return (
       <>
          <Dialog open={productos} size='xxl' handler={addHandleProd} dismiss={{ enabled: false }}>
             <DialogHeader>Agregar Proveedor</DialogHeader>
             <form>
                <DialogBody divider>
                   <div className='flex gap-2'>
                      <Input label='Nombre' type='text' />
                      <Input label='Producto' type='text' />
                   </div>
                </DialogBody>
                <DialogBody>
                   <Typography className='flex items-center shrink-0 text-blue-gray-900 antialiased font-sans text-xl font-semibold leading-snug'>Proveedores</Typography>
                   <Button onClick={addHandleProd}>Agregar Proveedor</Button>
                   <div className='flex gap-2'>
                   {input.proveedor.map((x) => (
                        <p>{x.proveedor}</p>
                     ))}
                   </div>
                </DialogBody>
                <DialogBody>
                   <Typography className='flex items-center shrink-0 text-blue-gray-900 antialiased font-sans text-xl font-semibold leading-snug'>Productos</Typography>
                   <Button onClick={addHandleProd}>Agregar Producto</Button>
                   <div className='flex gap-2'>
                   {productos.map((product, index) => (
                <p key={index}>{product.name}</p>
              ))}
                   </div>
                </DialogBody>
                <DialogFooter>
                   <Button variant='text' color='red' onClick={addHandleOpenProv} className='mr-1'>
                      <span>Cancel</span>
                   </Button>
                   <Button variant='gradient' color='green' onClick={addHandleOpenProv}>
                      <span>Agregar</span>
                   </Button>
                </DialogFooter>
             </form>
             {productos && <AddProducto addHandleProd={addHandleProd} addOpenPro={productos} />}
          </Dialog>
       </>
    );
}
 
 export default AddProvider;