import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography, Card, Select, Option, Spinner } from '@material-tailwind/react';
import SelOrden from '../oredenForm/SelOrden';
import { useContenedores } from '@/customHooks/useContenedores';
import EtiquetaComponente from '../etiquetas/EtiquetaComponente';
import { contLimpiarContenedor } from '@/redux/reducer/reducerContenedor';
import { useImportForm } from '@/customHooks/useImportForm';
import { EditInputs } from './EditInputs';

const ViewEditImportacion = ({ viewEditHandleOpenCon, viewEditOpenCon, id }) => {
   const [selOpenOrd, setOpenOrd] = useState(false);
   const selHandleOpenOrd = () => setOpenOrd(!selOpenOrd);
   const { contenedorCont, loadingCont, onChangeAddCon, onSubmitAddCon, onClickAddCon, dispatch, onViewOneCon } = useContenedores(viewEditHandleOpenCon);

   useEffect(() => {
      onViewOneCon(id);
   }, []);

   const cancelar = () => {
      dispatch(contLimpiarContenedor());
      viewEditHandleOpenCon();
   };

     
   // console.log("fuera del map", codigo)


contenedorCont.importaciones.map((ele, index) => {

<EditInputs ele={ele}/>
})


   const TABLE_HEAD = ['Desacripcion Producto', 'Codigo', 'N° OC', 'Responsable', 'Fecha RDM', 'Cliente Requisitor', 'Tester Etiqueta', 'Proveedor Adjudicado', 'Fecha Cot.', 'Dias de Entrega', 'Cantidad', 'Cajas/Rollos', 'Kg', 'CBM', 'C.U. (USD FOB)', 'Total FOB', 'Adelanto Proveedor', 'Cuenta por Pagar', 'C.U. Venta', 'Total Venta', 'Adelanto Cliente'];

   return (
      <>
         <Dialog open={viewEditOpenCon} size='xxl' handler={viewEditHandleOpenCon} dismiss={{ enabled: false }}>
            <DialogHeader>{contenedorCont.nombreContenedor}</DialogHeader>
            {loadingCont ? (
               <DialogBody>
                  <Spinner className='h-20 w-20 mx-auto my-10' />
               </DialogBody>
            ) : (
               <form onSubmit={onSubmitAddCon}>
                  <DialogBody divider>
                     <div className='flex gap-2'>
                        <Input label='Nombre Contenedor' type='text' name='nombreContenedor' value={contenedorCont.nombreContenedor} onChange={onChangeAddCon} />
                        <Input label='Fecha RDM' type='date' name='fechaRDM' value={contenedorCont.fechaRDM} onChange={onChangeAddCon} />
                        <Input label='Fecha EDC' type='date' name='fechaEDC' value={contenedorCont.fechaEDC} onChange={onChangeAddCon} />
                        <Input label='Importacion Tipo' type='text' name='tipo' value={contenedorCont.tipo} onChange={onChangeAddCon} />
                        <Input label='Package Tipo' type='text' name='packageTipo' value={contenedorCont.packageTipo} onChange={onChangeAddCon} />
                     </div>
                  </DialogBody>
                  <DialogBody>
                     <Typography className='flex items-center shrink-0 text-blue-gray-900 antialiased font-sans text-xl font-semibold leading-snug'>Importaciones</Typography>
                     <Button onClick={selHandleOpenOrd}>Agregar OC</Button>
                     <Card className='overflow-scroll h-[calc(100vh-323px)] w-[calc(100vw-35px)] mt-3'>
                        <table className='w-full min-w-max table-auto text-left'>
                           <thead>
                              <tr>
                                 {TABLE_HEAD.map((head) => (
                                    <th key={head} className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${head == 'Desacripcion Producto' ? 'sticky left-0 top-0 z-20' : 'sticky top-0 z-10'}`}>
                                       <Typography variant='small' color='blue-gray' className='font-normal leading-none bg-blue-gray-50'>
                                          {head}
                                       </Typography>
                                    </th>
                                 ))}
                              </tr>
                           </thead>
                           <tbody>

                        {contenedorCont.importaciones.map(({ codigo, fechaRDM, descripcionProducto, cantidadSolicitada, precioUnitario, valor, ordenCompra, cliente, proveedor, etiquetas, totalFOB, totalVenta, cuentaCliente, cuentaPorPagar, fechaCOT, diasEntregas, cajasRollos, kg, cbm, adelantoProveedor, cuVenta, adelantoCliente }, index) => (
                              <>
                              
                                
                                <tr key={index} className='even:bg-blue-gray-50/50'>
                                    <td className='p-2 sticky left-0 bg-blue-gray-50'>
                                       <Typography variant='small' color='blue-gray' className='font-normal w-52'>
                                          {descripcionProducto}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {codigo}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {ordenCompra.numero}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {ordenCompra.solicitante}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {fechaRDM}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {cliente.nombreEmpresa}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <EtiquetaComponente key={index} />
                                       {/* <select className='w-full h-[50px] max-w-[250px] bg-gray-400'>
                                        <option className='w-full h-[50px]'></option>
                                        <option>Uno</option>
                                        <option>Dos</option>
                                        <option>Tres</option>
                                        <option>Cuatro</option>
                                     </select> */}
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {proveedor.nombreEmpresa}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {fechaCOT}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       {/* <Input label='' type='number' value={diasEntregas} onChange={(e) => e.target.value} /> */}
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {diasEntregas}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {cantidadSolicitada}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {cajasRollos}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {kg}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {cbm}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {precioUnitario}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {/* DETALLES CON LOS VALORES LEIDOS DESDE LA IA */}
                                          {parseInt(cantidadSolicitada) * parseFloat(precioUnitario)}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {adelantoProveedor}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {cuentaPorPagar}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {cuVenta}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {cantidadSolicitada * cuVenta}
                                       </Typography>
                                    </td>
                                    <td className='p-2'>
                                       <Typography variant='small' color='blue-gray' className='font-normal'>
                                          {adelantoCliente}
                                       </Typography>
                                    </td>
                                 </tr>
                                 </>
                              ))}
                           </tbody>
                        </table>
                     </Card>
                  </DialogBody>
                  <DialogFooter>
                     <Button variant='text' color='red' onClick={cancelar} className='mr-1'>
                        <span>Cancel</span>
                     </Button>
                     <Button type='submit' variant='gradient' color='green' onClick={onClickAddCon} disabled>
                        <span>Agregar</span>
                     </Button>
                  </DialogFooter>
               </form>
            )}
            {selOpenOrd && <SelOrden selHandleOpenOrd={selHandleOpenOrd} selOpenOrd={selOpenOrd} />}
         </Dialog>
      </>
   );
};

export default ViewEditImportacion;
