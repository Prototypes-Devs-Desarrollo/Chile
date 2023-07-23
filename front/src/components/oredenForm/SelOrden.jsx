import { useOrdenes } from '@/customHooks/useOrdenes';
import { Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const SelOrden = ({ selHandleOpenOrd, selOpenOrd }) => {
   const { importaciones } = useSelector((state) => state.reducerContenedor.contenedorCont);
   const { ordenesOrde, onUseEffectOrd, loading, onClickSelOrdAddImp, getOrdColorSelect } = useOrdenes();

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
                     <Card key={idx} color={importaciones.find((i) => i.ordenCompra.numero == x.ordenCompra.numero) ? 'green' : 'blue'} className='w-52 cursor-pointer' onClick={() => onClickSelOrdAddImp(x)}>
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
               <span>Cancelar</span>
            </Button>
            <Button variant='gradient' color='green' onClick={selHandleOpenOrd} className='mr-1'>
               <span>Listo</span>
            </Button>
         </DialogFooter>
      </Dialog>
   );
};

export default SelOrden;
