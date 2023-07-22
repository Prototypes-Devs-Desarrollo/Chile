import { useOrdenes } from '@/customHooks/useOrdenes';
import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';

const SelOrden = ({ selHandleOpenOrd, selOpenOrd }) => {
   const { ordenesOrde, onUseEffectOrd, loading } = useOrdenes(selHandleOpenOrd);

   useEffect(() => {
      onUseEffectOrd('PENDIENTES');
   }, []);

   return (
      <Dialog open={selOpenOrd} size='lg' handler={selHandleOpenOrd} dismiss={{ enabled: false }}>
         <DialogHeader>OC Pendientes</DialogHeader>
         <DialogBody divider>
               {loading ? (
                  <Spinner className='h-20 w-20 mx-auto my-10' />
               ) : (
                  <div className='flex flex-row flex-wrap gap-2 justify-center'>
                     {ordenesOrde.map((x, idx) => (
                        <Card key={idx} color='blue' className='w-52 cursor-pointer' onClick={() => console.log(x.ordenCompra.numero)}>
                           <CardBody className='p-2'>
                              <Typography className='text-center font-bold'>Orden N° {x.ordenCompra.numero}</Typography>
                              <Typography className='text-center font-bold'>Cant. Productos {x.productos.length}</Typography>
                           </CardBody>
                        </Card>
                     ))}
                  </div>
               )}
         </DialogBody>
         <DialogFooter>
            <Button variant='text' color='red' onClick={selHandleOpenOrd} className='mr-1'>
               <span>Cerrar</span>
            </Button>
         </DialogFooter>
      </Dialog>
   );
};

export default SelOrden;
