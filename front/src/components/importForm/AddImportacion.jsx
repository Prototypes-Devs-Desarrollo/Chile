import React, { useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography } from '@material-tailwind/react';
import { useImportForm } from '@/customHooks/useImportForm';
import SelOrden from '../oredenForm/SelOrden';

const AddImportacion = ({ addHandleOpenCon, addOpenCon }) => {
   const { inputImp } = useImportForm();

   const [selOpenOrd, setAddOpenPro] = useState(false);
   const selHandleOpenOrd = () => setAddOpenPro(!selOpenOrd);

   return (
      <>
         <Dialog open={addOpenCon} size='xxl' handler={addHandleOpenCon} dismiss={{ enabled: false }}>
            <DialogHeader>Agregar Contenedor</DialogHeader>
            <form>
               <DialogBody divider>
                  <div className='flex gap-2'>
                     <Input label='Nombre Contenedor' type='text' name='nombreContenedor' />
                     <Input label='Fecha RDM' type='date' />
                     <Input label='Fecha EDC' type='date' onChange={(e) => console.log(e.target.value)} />
                     <Input label='Importacion Tipo' type='text' />
                     <Input label='Package Tipo' type='text' />
                  </div>
               </DialogBody>
               <DialogBody>
                  <Typography className='flex items-center shrink-0 text-blue-gray-900 antialiased font-sans text-xl font-semibold leading-snug'>Importaciones</Typography>
                  <Button onClick={selHandleOpenOrd}>Agregar OC</Button>
                  <div className='flex gap-2'>
                     {/* {input.productos.map((x) => (
                        <p>{x.name}</p>
                     ))} */}
                  </div>
               </DialogBody>
               <DialogFooter>
                  <Button variant='text' color='red' onClick={addHandleOpenCon} className='mr-1'>
                     <span>Cancel</span>
                  </Button>
                  <Button variant='gradient' color='green' onClick={addHandleOpenCon}>
                     <span>Agregar</span>
                  </Button>
               </DialogFooter>
            </form>
            {selOpenOrd && <SelOrden selHandleOpenOrd={selHandleOpenOrd} selOpenOrd={selOpenOrd} />}
         </Dialog>
      </>
   );
};

export default AddImportacion;
