import { Button, Card, CardBody, CardHeader, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Squares2X2Icon, TableCellsIcon } from '@heroicons/react/24/solid';
import { useOrdenes } from '@/customHooks/useOrdenes';
import AddOrdenIA from '@/components/oredenForm/AddOrdenIA';

const odenesdecompras = () => {
   // EXPERIMENTAL
   const [addOpenIa, setAddOpenIa] = useState(false);
   const addHandleOpenIa = () => setAddOpenIa(!addOpenIa);
   // FIN EXPERIMENTAL

   const { cards, error, success, loading, ordenesOrde, onClickCards, onUseEffectOrd, setSuccess, setError } = useOrdenes();

   useEffect(() => {
      onUseEffectOrd();
   }, []);

   useEffect(() => {
      return () => {
         if (error) {
            setError('');
         }
      };
   }, [error]);

   useEffect(() => {
      return () => {
         if (success) {
            setSuccess('');
         }
      };
   }, [success]);

   const TABLE_HEAD = ['Orden N°', 'Cliente', 'Proveedor', 'Solicitante', 'Cant. Productos', 'Neto', 'IVA', 'Total'];

   return (
      <>
         <div className='w-[calc(100%-256px)] h-screen overflow-y-auto p-2'>
            <div className='flex justify-between items-center pb-3'>
               <Typography variant='h4'>Odenes de Compras</Typography>
               <Button onClick={addHandleOpenIa}>Add</Button>
               {cards ? <Squares2X2Icon className='h-9 w-9 text-black' onClick={onClickCards} /> : <TableCellsIcon className='h-9 w-9 text-black' onClick={onClickCards} />}
            </div>
            {loading ? (
               <Spinner className='h-20 w-20 mx-auto my-10' />
            ) : cards ? (
               <div className='flex flex-row flex-wrap gap-3 justify-items-stretch pt-3'>
                  {ordenesOrde.map((o, idx) => (
                     <Card className='w-full max-w-[16rem]' key={idx}>
                        <CardBody>
                           <Typography className='text-center font-extrabold'>Orden N° {o.ordenCompra.numero}</Typography>
                           <Typography>Cliente: {o.cliente.nombreEmpresa}</Typography>
                           <Typography>Proveedor: {o.proveedor.nombreEmpresa}</Typography>
                           <Typography>Solicitante: {o.ordenCompra.solicitante}</Typography>
                           <Typography>Cantidad de Productos: {o.productos.length}</Typography>
                           <Typography className='text-right font-bold'>Neto: {o.subTotal}</Typography>
                           <Typography className='text-right font-bold'>IVA: {o.iva}</Typography>
                           <Typography className='text-right font-bold'>Total: {o.total}</Typography>
                        </CardBody>
                     </Card>
                  ))}
               </div>
            ) : (
               <Card className='overflow-scroll h-[100%-36px] w-full'>
                  <table className='w-full min-w-max table-auto text-left'>
                     <thead>
                        <tr>
                           {TABLE_HEAD.map((head) => (
                              <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                                    {head}
                                 </Typography>
                              </th>
                           ))}
                        </tr>
                     </thead>
                     <tbody>
                        {ordenesOrde.map((o, idx) => (
                           <tr key={idx} className='even:bg-blue-gray-50/50'>
                              <td className='p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal'>
                                    {o.ordenCompra.numero}
                                 </Typography>
                              </td>
                              <td className='p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal'>
                                    {o.cliente.nombreEmpresa}
                                 </Typography>
                              </td>
                              <td className='p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal'>
                                    {o.proveedor.nombreEmpresa}
                                 </Typography>
                              </td>
                              <td className='p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal'>
                                    {o.ordenCompra.solicitante}
                                 </Typography>
                              </td>
                              <td className='p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal'>
                                    {o.productos.length}
                                 </Typography>
                              </td>
                              <td className='p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal'>
                                    {o.subTotal}
                                 </Typography>
                              </td>
                              <td className='p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal'>
                                    {o.iva}
                                 </Typography>
                              </td>
                              <td className='p-4'>
                                 <Typography variant='small' color='blue-gray' className='font-normal'>
                                    {o.total}
                                 </Typography>
                              </td>
                              {/* <td className='p-4'>
                                 <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                                    Edit
                                 </Typography>
                              </td> */}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </Card>
            )}
         </div>
         {addOpenIa && <AddOrdenIA addHandleOpenIa={addHandleOpenIa} addOpenIa={addOpenIa} listarOrdenes={onUseEffectOrd} />}
      </>
   );
};

export default odenesdecompras;
