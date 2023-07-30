import { Button, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import EtiquetaComponente from '../etiquetas/EtiquetaComponente';
import { contEditImportacion } from '@/redux/reducer/reducerContenedor';
import { useDispatch } from 'react-redux';

export const EditInputs = ({ imp, idx, contenedorCont }) => {
   const dispatch = useDispatch()
   const [update, setUpdate] = useState(false)
  const [editImportacion, setEditImportacion] = useState({
    codigo: '',
    fechaRDM: '',
    descripcionProducto: '',
    cantidadSolicitada: '',
    precioUnitario: '',
    valor: '',
    ordenCompra: {
      numero: '',
      fechaEmision: '',
      formaPago: '',
      fechaEntrega: '',
      moneda: '',
      solicitante: '',
    },
    cliente: {
      id: '',
      nombreEmpresa: '',
      rut: '',
      giro: '',
      direccion: '',
      email: '',
      telefono: '',
    },
    proveedor: {
      id: '',
      nombreEmpresa: '',
      rut: '',
      direccion: '',
      comuna: '',
      giro: '',
      ciudad: '',
      contacto: '',
    },
    etiquetas: [],

    totalFOB: 0,
    totalVenta: 0,
    cuentaCliente: 0,
    cuentaPorPagar: 0,
    fechaCOT: '',
    diasEntregas: 0,
    cajasRollos: 0,
    kg: 0,
    cbm: 0,
    adelantoProveedor: 0,
    cuVenta: 0,
    adelantoCliente: 0,
  });
console.log(contenedorCont)

  // useEffect para establecer los valores de editImportacion a partir de imp
  useEffect(() => {
    setEditImportacion(imp);
  }, [imp]);

  const onChangeConImp = (e, idx) => {
    setEditImportacion({
      ...editImportacion,
      [e.target.name]: e.target.value,
    });
    setUpdate(true)

  };

useEffect(() => {
   dispatch(contEditImportacion(editImportacion));
   setUpdate(false)
}, [update])



  const handleSelectEtiqueta = (selectedEtiqueta) => {
   const etiquetaExistente = editImportacion.etiquetas.find(
     (etiqueta) => etiqueta === selectedEtiqueta
   );

   if (etiquetaExistente) {
     const etiquetasActualizadas = editImportacion.etiquetas.map((etiqueta) =>
       etiqueta === selectedEtiqueta ? selectedEtiqueta : etiqueta
     );
     setEditImportacion({
       ...editImportacion,
       etiquetas: etiquetasActualizadas,
     });
     setUpdate(true)

   } else {
     setEditImportacion({
       ...editImportacion,
       etiquetas: [...editImportacion.etiquetas, selectedEtiqueta],
     });
     setUpdate(true)

   }
 };
 const etiquetas = [
   { label: 'Pendiente', value: 'pendiente' },
   { label: 'En Camino', value: 'en camino' },
   { label: 'Completado', value: 'completado' },
 ];


  return (
    <tr className='even:bg-blue-gray-50/50'>
      <td className='p-2 sticky left-0 bg-blue-gray-50'>
        <Typography variant='small' color='blue-gray' className='font-normal w-52'>
          {editImportacion.descripcionProducto}
        </Typography>
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {editImportacion.codigo}
        </Typography>
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {editImportacion.ordenCompra.numero}
        </Typography>
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {editImportacion.ordenCompra.solicitante}
        </Typography>
      </td>
      <td className='p-2'>
        <input
          type='date'
          name='fechaRDM'
          value={editImportacion.fechaRDM}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {editImportacion.cliente.nombreEmpresa}
        </Typography>
      </td>

      <td className='p-2'>
         <select
          className='w-full h-[60px] max-w-[250px] bg-gray-400'
          onChange={(e) => handleSelectEtiqueta(e.target.value)}
        >
          <option value=''>Seleccione una etiqueta</option>
          {etiquetas.map((etiqueta) => (
            <option defaultValue={editImportacion.etiquetas[0]} key={etiqueta.value} value={etiqueta.value}>
              {etiqueta.label}
            </option>
          ))}
        </select>   
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {editImportacion.proveedor.nombreEmpresa}
        </Typography>
      </td>
      <td className='p-2'>
        <input
          type='date'
          name='fechaCOT'
          value={editImportacion.fechaCOT}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <input
          type='number'
          name='diasEntregas'
          value={editImportacion.diasEntregas}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {editImportacion.cantidadSolicitada}
        </Typography>
      </td>
      <td className='p-2'>
        <input
          type='number'
          name='cajasRollos'
          value={editImportacion.cajasRollos}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <input
          type='number'
          name='kg'
          defaultValue={editImportacion.kg}
          value={editImportacion.kg}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <input
          type='number'
          name='cbm'
          value={editImportacion.cbm}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {editImportacion.precioUnitario}
        </Typography>
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {/* DETALLES CON LOS VALORES LEIDOS DESDE LA IA */}
          {parseInt(editImportacion.cantidadSolicitada) * parseFloat(editImportacion.precioUnitario)}
        </Typography>
      </td>
      <td className='p-2'>
        <input
          type='number'
          name='adelantoProveedor'
          value={editImportacion.adelantoProveedor}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <input
          type='number'
          name='cuentaPorPagar'
          value={editImportacion.cuentaPorPagar}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <input
          type='number'
          name='cuVenta'
          value={editImportacion.cuVenta}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
      <td className='p-2'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {editImportacion.cantidadSolicitada * editImportacion.cuVenta}
        </Typography>
      </td>
      <td className='p-2'>
        <input
          type='number'
          name='adelantoCliente'
          value={editImportacion.adelantoCliente}
          onChange={(e) => onChangeConImp(e, idx)}
        />
      </td>
    </tr>
  );
};