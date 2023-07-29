import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography, Card, Select, Option, Spinner } from '@material-tailwind/react';
import SelOrden from '../oredenForm/SelOrden';
import { useContenedores } from '@/customHooks/useContenedores';
import EtiquetaComponente from '../etiquetas/EtiquetaComponente';
import { contLimpiarContenedor } from '@/redux/reducer/reducerContenedor';
import { EditInputs } from '../all/EditInputs';

const ViewEditImportacion = ({ viewEditHandleOpenCon, viewEditOpenCon, id }) => {
   const [selOpenOrd, setOpenOrd] = useState(false);
   const selHandleOpenOrd = () => setOpenOrd(!selOpenOrd);
   const { contenedorCont, loadingCont, onChangeAddCon, onSubmitEditCon, onClickAddCon, dispatch, onViewOneCon } = useContenedores(viewEditHandleOpenCon);
 
   useEffect(() => {
      onViewOneCon(id);
   }, []);

   const cancelar = () => {
      dispatch(contLimpiarContenedor());
      viewEditHandleOpenCon();
   };


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
               <form onSubmit={onSubmitEditCon}>
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
                              {contenedorCont.importaciones.map((imp, index) => (
                                 <EditInputs contenedorCont={contenedorCont} key={index} imp={imp} idx={index} />
                              ))}
                           </tbody>
                        </table>
                     </Card>
                  </DialogBody>
                  <DialogFooter>
                     <Button variant='text' color='red' onClick={cancelar} className='mr-1'>
                        <span>Cancel</span>
                     </Button>
                     <Button type='submit' variant='gradient' color='green' onClick={() => onClickAddCon(editImportacion) } /* disabled */>
                        <span>Agregar</span>
                     </Button>
                                          <Button type='submit' variant='gradient' color='green' onClick={() => onClickAddCon(editImportacion) } /* disabled */>
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
