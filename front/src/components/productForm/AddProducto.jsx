import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography } from '@material-tailwind/react';
import { useProductForm } from '@/customHooks/useProductForm';

const AddProducto = ({ addHandleOpenPro, addOpenPro }) => {
   const { input, onChangeAddPro, onClickAddPro, onSubmitAddPro, errores, error } = useProductForm(addHandleOpenPro);

   return (
      <>
         {console.log(errores, error)}
         <Dialog open={addOpenPro} size='xl' handler={addHandleOpenPro} dismiss={{ enabled: false }}>
            <DialogHeader>Agregar Producto</DialogHeader>
            <form onSubmit={onSubmitAddPro}>
               <DialogBody divider>
                  <div className='flex gap-2'>
                     <Input label='Nombre' name='name' type='text' value={input.name} onChange={onChangeAddPro} />
                     <Input label='OC' name='OC' type='text' value={input.OC} onChange={onChangeAddPro} />
                     <Input label='Estado Compra' name='estado_compra' type='text' value={input.estado_compra} onChange={onChangeAddPro} />
                     <Input label='Dias de Entrega' name='dias_de_entrega' type='text' value={input.dias_de_entrega} onChange={onChangeAddPro} />

                     {/* <Input label='Estado Compra' name='fecha_RDM' type='text' />
                     <Input label='Estado Compra' name='fecha_RDM' type='text' />
                     <Input label='Estado Compra' name='fecha_RDM' type='text' />
                    <Input label='Estado Compra' name='fecha_RDM' type='text' /> */}
                  </div>
                  <div className='flex gap-2 my-2'>
                     <Input label='Fecha RDM' name='fecha_RDM' type='date' value={input.fecha_RDM} onChange={onChangeAddPro} />
                     <Input label='Fecha Cot.' name='fecha_cot' type='date' value={input.fecha_cot} onChange={onChangeAddPro} />
                     <Input label='Cantidad' name='cantidad' type='text' value={input.cantidad} onChange={onChangeAddPro} />
                     <Input label='Peso' name='peso' type='text' value={input.peso} onChange={onChangeAddPro} />
                  </div>
                  <div className='flex gap-2'>
                     <Input label='CBM' name='CBM' type='text' value={input.CBM} onChange={onChangeAddPro} />
                     <Input label='Cajas Rollos' name='cajas_rollos' type='text' value={input.cajas_rollos} onChange={onChangeAddPro} />
                     <Input label='FOB' name='FOB' type='text' value={input.FOB} onChange={onChangeAddPro} />
                     <Input label='CU USD FOB' name='CU_USD_FOB' type='text' value={input.CU_USD_FOB} onChange={onChangeAddPro} />
                  </div>
                  <div className='flex gap-2 my-2'>
                     <Input label='Adelanto Proveedor' name='adelanto_proveedor' type='text' value={input.adelanto_proveedor} onChange={onChangeAddPro} />
                     <Input label='Cuenta por Pagar' name='cuenta_por_pagar' type='text' value={input.cuenta_por_pagar} onChange={onChangeAddPro} />
                     <Input label='Pago Cliente' name='pago_cliente' type='text' value={input.pago_cliente} onChange={onChangeAddPro} />
                     <Input label='Estado Producto' name='estado_producto' type='text' value={input.estado_producto} onChange={onChangeAddPro} />
                  </div>
                  <div className='flex gap-2'>
                     <Input label='Estado Entrega' name='estado_entrega' type='text' value={input.estado_entrega} onChange={onChangeAddPro} />
                     <Input label='Soportes Proveedor' name='soportes_proveedor' type='text' value={input.soportes_proveedor} onChange={onChangeAddPro} />
                     <Input label='Soporte OC' name='soporte_OC' type='text' value={input.soporte_OC} onChange={onChangeAddPro} />
                     <Input label='Volumen' name='volumen' type='text' value={input.volumen} onChange={onChangeAddPro} />
                  </div>
                  <div className='flex gap-2 my-2'>
                     <Input label='Swift Pago Recibido' name='swift_pago_recibido' type='text' value={input.swift_pago_recibido} onChange={onChangeAddPro} />
                  </div>
               </DialogBody>
               <DialogFooter>
                  <Button variant='text' color='red' onClick={addHandleOpenPro} className='mr-1'>
                     <span>Cancel</span>
                  </Button>
                  <Button type='submit' variant='gradient' color='green' onClick={onClickAddPro}>
                     <span>Agregar</span>
                  </Button>
               </DialogFooter>
            </form>
         </Dialog>
      </>
   );
};

export default AddProducto;
