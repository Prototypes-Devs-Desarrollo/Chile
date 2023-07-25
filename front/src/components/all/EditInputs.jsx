import { useImportForm } from '@/customHooks/useImportForm';
import { Typography } from '@material-tailwind/react';
import React from 'react';
import EtiquetaComponente from '../etiquetas/EtiquetaComponente';

export const EditInputs = ({ imp, idx }) => {
   const { inputImp, onChangeConImp } = useImportForm(imp);

   return (
      <tr className='even:bg-blue-gray-50/50'>
         <td className='p-2 sticky left-0 bg-blue-gray-50'>
            <Typography variant='small' color='blue-gray' className='font-normal w-52'>
               {inputImp.descripcionProducto}
            </Typography>
            
         </td>
         <td className='p-2'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
               {inputImp.codigo}
            </Typography>
         </td>
         <td className='p-2'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
               {inputImp.ordenCompra.numero}
            </Typography>
         </td>
         <td className='p-2'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
               {inputImp.ordenCompra.solicitante}
            </Typography>
         </td>
         <td className='p-2'>
            <input type='date' name='fechaRDM' value={inputImp.fechaRDM} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
               {inputImp.cliente.nombreEmpresa}
            </Typography>
         </td>
         <td className='p-2'>
            <EtiquetaComponente />
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
               {inputImp.proveedor.nombreEmpresa}
            </Typography>
         </td>
         <td className='p-2'>
            <input type='date' name='fechaCOT' value={inputImp.fechaCOT} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <input type='number' name='diasEntregas' value={inputImp.diasEntregas} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
               {inputImp.cantidadSolicitada}
            </Typography>
         </td>
         <td className='p-2'>
            <input type='number' name='cajasRollos' value={inputImp.cajasRollos} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <input type='number' name='kg' value={inputImp.kg} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <input type='number' name='cbm' value={inputImp.cbm} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
               {inputImp.precioUnitario}
            </Typography>
         </td>
         <td className='p-2'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
               {/* DETALLES CON LOS VALORES LEIDOS DESDE LA IA */}
               {parseInt(inputImp.cantidadSolicitada) * parseFloat(inputImp.precioUnitario)}
            </Typography>
         </td>
         <td className='p-2'>
            <input type='number' name='adelantoProveedor' value={inputImp.adelantoProveedor} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <input type='number' name='cuentaPorPagar' value={inputImp.cuentaPorPagar} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <input type='number' name='cuVenta' value={inputImp.cuVenta} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
         <td className='p-2'>
            <Typography variant='small' color='blue-gray' className='font-normal'>
               {inputImp.cantidadSolicitada * inputImp.cuVenta}
            </Typography>
         </td>
         <td className='p-2'>
            <input type='number' name='adelantoCliente' value={inputImp.adelantoCliente} onChange={(e) => onChangeConImp(e, idx)} />
         </td>
      </tr>
   );
};
