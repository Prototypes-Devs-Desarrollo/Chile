import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography } from '@material-tailwind/react';
import AddProducto from '../productForm/AddProducto';
import { useProvForm } from '@/customHooks/useProvForm';

const AddProvider = ({ addHandleOpenProv, addOpenProv}) => {
    const { input, setInput } = useProvForm();
//   const [provider, setProvider] = useState(false);
//   const addHandleProd = () => setProvider(!provider);
 
    return (
       <>
          <Dialog open={addOpenProv} size='md' handler={addHandleOpenProv} dismiss={{ enabled: false }}>
             <DialogHeader>Agregar Proveedor</DialogHeader>
             <form>
                <DialogBody divider>
                   <div className='flex gap-2'>
                      <Input label='Nombre' name='name' type='text' />
                   </div>
                </DialogBody>
                <DialogFooter>
                   <Button variant='text' color='red' onClick={addHandleOpenProv} className='mr-1'>
                      <span>Cancel</span>
                   </Button>
                   <Button variant='gradient' color='green' onClick={addHandleOpenProv} type='submit'>
                      <span>Agregar</span>
                   </Button>
                </DialogFooter>
             </form>
          </Dialog>
       </>
    );
}
 
 export default AddProvider;