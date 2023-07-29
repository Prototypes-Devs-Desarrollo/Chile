import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddContenedorMethod, ListContenedoresMethod, ViewContenedorMethod } from '../../utils/metodos/metodosContenedores';
import { contSetLoading, contSetError, contSetContenedor, contSetContenedores, contSetSuccess, contLimpiarContenedor } from '@/redux/reducer/reducerContenedor';
import { ValidoAddContenedor } from '../../utils/validaciones';

const validaInitial = {
   valido: true,
};

export const useContenedores = (addHandleOpenCon) => {
   const dispatch = useDispatch();
   const { contenedoresCont, contenedorCont, loadingCont, errorCont, successCont } = useSelector((state) => state.reducerContenedor);
   const [cardsCon, setCardsCon] = useState(true);
   const [erroresCon, setErroresCon] = useState(validaInitial);

   const onUseEffectCon = async () => {
      await ListContenedoresMethod({
         loading: (v) => dispatch(contSetLoading(v)),
         error: (msg) => dispatch(contSetError(msg)),
         success: (res) => {
            dispatch(contSetContenedores(res.payload));
         },
      });
   };

   const onViewOneCon = async (id) => {
      await ViewContenedorMethod({
         id,
         loading: (v) => dispatch(contSetLoading(v)),
         error: (msg) => dispatch(contSetError(msg)),
         success: (res) => {
            dispatch(contSetContenedor(res.payload));
         },
      });
   };

   const onChangeAddCon = (e) => {
      dispatch(
         contSetContenedor({
            ...contenedorCont,
            [e.target.name]: e.target.value,
         })
      );
      onClickAddCon(e);
   };

   const onClickAddCon = (e) => {
      setErroresCon(
         ValidoAddContenedor({
            ...contenedorCont,
            [e.target.name]: e.target.value,
         })
      );
   };

   const onSubmitEditCon = async (e) => {
      e.preventDefault();
      console.log(e.target)
      // if (errorCont) {
      //    dispatch(contSetError(''));
      // }
      // if (successCont) {
      //    dispatch(contSetSuccess(''));
      // }

      // if (erroresCon.valido) {
      //    console.log(contenedorCont);
      //    await AddContenedorMethod({
      //       con: contenedorCont,
      //       loading: (v) => dispatch(contSetLoading(v)),
      //       error: (msg) => dispatch(contSetError(msg)),
      //       success: async (res) => {
      //          await onUseEffectCon();
      //          dispatch(contLimpiarContenedor());
      //          addHandleOpenCon();
      //       },
      //    });
      // }
   };

   const onSubmitAddCon = async (e, ) => {
      e.preventDefault();
      if (errorCont) {
         dispatch(contSetError(''));
      }
      if (successCont) {
         dispatch(contSetSuccess(''));
      }

      if (erroresCon.valido) {
         console.log(contenedorCont);
         await AddContenedorMethod({
            con: contenedorCont,
            loading: (v) => dispatch(contSetLoading(v)),
            error: (msg) => dispatch(contSetError(msg)),
            success: async (res) => {
               await onUseEffectCon();
               dispatch(contLimpiarContenedor());
               addHandleOpenCon();
            },
         });
      }
   };

   const onClickCardsCon = () => setCardsCon(!cardsCon);

   return {
      onClickCardsCon,
      onChangeAddCon,
      onClickAddCon,
      onSubmitAddCon,
      onUseEffectCon,
      onViewOneCon,
      cardsCon,
      contenedoresCont,
      contenedorCont,
      erroresCon,
      errorCont,
      successCont,
      loadingCont,
      dispatch,
      onSubmitEditCon,
   };
};

// OBJETO DE EJEMPLO
const uno = {
   id: '',
   nombreContenedor: 'dfgdsfgsdf',
   fechaRDM: '2023-07-06',
   fechaEDC: '2023-07-02',
   tipo: 'retdsfg',
   packageTipo: 'dsfgsdfgdfs',
   importaciones: [
      {
         codigo: 'A-S2-546839',
         fechaRDM: '',
         descripcionProducto: 'SIKAFLEX 221 CAJA POR 12 CARTUCHOS 300ML Sellador de poliuretano color gris',
         cantidadSolicitada: '240',
         precioUnitario: '7.083,333',
         valor: '1.700.000',
         ordenCompra: {
            numero: '740',
            fechaEmision: '28 de junio de 2023',
            formaPago: 'Cheque',
            fechaEntrega: '03 de julio de 2023',
            moneda: 'Pesos',
            solicitante: 'Ana Sanchez',
         },
         cliente: {
            nombreEmpresa: 'Algo',
            rut: '76.823.233-4',
            giro: '',
            direccion: 'R.5 SUR CHINQUIHUE ALTO KM1029, Puerto Montt',
            email: 'daraya@sasfa.cl',
            telefono: 'Teléfono(s): ',
         },
         proveedor: {
            nombreEmpresa: 'Sika S.A Chile',
            rut: '91.947.000-3',
            direccion: 'Avda. Pdte. Salvador Allende 85, San Joaquin 8941077 Santiago',
            comuna: 'Buin',
            giro: 'Comercializacion',
            ciudad: 'Santiago',
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
      },
      {
         codigo: 'A-SC-593298',
         fechaRDM: '',
         descripcionProducto: 'SIKABOOM CAJA 12 TARROS DE 750ML Espuma expansiva monocomponente',
         cantidadSolicitada: '180',
         precioUnitario: '7.916,667',
         valor: '1.425.000',
         ordenCompra: {
            numero: '740',
            fechaEmision: '28 de junio de 2023',
            formaPago: 'Cheque',
            fechaEntrega: '03 de julio de 2023',
            moneda: 'Pesos',
            solicitante: 'Ana Sanchez',
         },
         cliente: {
            nombreEmpresa: 'Algo',
            rut: '76.823.233-4',
            giro: '',
            direccion: 'R.5 SUR CHINQUIHUE ALTO KM1029, Puerto Montt',
            email: 'daraya@sasfa.cl',
            telefono: 'Teléfono(s): ',
         },
         proveedor: {
            nombreEmpresa: 'Sika S.A Chile',
            rut: '91.947.000-3',
            direccion: 'Avda. Pdte. Salvador Allende 85, San Joaquin 8941077 Santiago',
            comuna: 'Buin',
            giro: 'Comercializacion',
            ciudad: 'Santiago',
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
      },
      {
         codigo: 'A-SM-885030',
         fechaRDM: '',
         descripcionProducto: 'SIKABOND MONTAJE CAJA POR 12 CARTUCHOS 300ML adhesivo multiusos para montaje',
         cantidadSolicitada: '240',
         precioUnitario: '2.166,667',
         valor: '520.000',
         ordenCompra: {
            numero: '740',
            fechaEmision: '28 de junio de 2023',
            formaPago: 'Cheque',
            fechaEntrega: '03 de julio de 2023',
            moneda: 'Pesos',
            solicitante: 'Ana Sanchez',
         },
         cliente: {
            nombreEmpresa: 'Algo',
            rut: '76.823.233-4',
            giro: '',
            direccion: 'R.5 SUR CHINQUIHUE ALTO KM1029, Puerto Montt',
            email: 'daraya@sasfa.cl',
            telefono: 'Teléfono(s): ',
         },
         proveedor: {
            nombreEmpresa: 'Sika S.A Chile',
            rut: '91.947.000-3',
            direccion: 'Avda. Pdte. Salvador Allende 85, San Joaquin 8941077 Santiago',
            comuna: 'Buin',
            giro: 'Comercializacion',
            ciudad: 'Santiago',
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
      },
      {
         codigo: 'A-S2-546839',
         fechaRDM: '',
         descripcionProducto: 'SIKAFLEX 221 CAJA POR 12 CARTUCHOS 300ML Sellador de poliuretano color negro',
         cantidadSolicitada: '240',
         precioUnitario: '7.083,333',
         valor: '1.700.000',
         ordenCompra: {
            numero: '740',
            fechaEmision: '28 de junio de 2023',
            formaPago: 'Cheque',
            fechaEntrega: '03 de julio de 2023',
            moneda: 'Pesos',
            solicitante: 'Ana Sanchez',
         },
         cliente: {
            nombreEmpresa: 'Algo',
            rut: '76.823.233-4',
            giro: '',
            direccion: 'R.5 SUR CHINQUIHUE ALTO KM1029, Puerto Montt',
            email: 'daraya@sasfa.cl',
            telefono: 'Teléfono(s): ',
         },
         proveedor: {
            nombreEmpresa: 'Sika S.A Chile',
            rut: '91.947.000-3',
            direccion: 'Avda. Pdte. Salvador Allende 85, San Joaquin 8941077 Santiago',
            comuna: 'Buin',
            giro: 'Comercializacion',
            ciudad: 'Santiago',
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
      },
      {
         codigo: 'A-S2-546839',
         fechaRDM: '',
         descripcionProducto: 'SIKAFLEX 221 CAJA POR 12 CARTUCHOS 300ML Sellador de poliuretano color blanco',
         cantidadSolicitada: '60',
         precioUnitario: '7.083,333',
         valor: '425.000',
         ordenCompra: {
            numero: '740',
            fechaEmision: '28 de junio de 2023',
            formaPago: 'Cheque',
            fechaEntrega: '03 de julio de 2023',
            moneda: 'Pesos',
            solicitante: 'Ana Sanchez',
         },
         cliente: {
            nombreEmpresa: 'Algo',
            rut: '76.823.233-4',
            giro: '',
            direccion: 'R.5 SUR CHINQUIHUE ALTO KM1029, Puerto Montt',
            email: 'daraya@sasfa.cl',
            telefono: 'Teléfono(s): ',
         },
         proveedor: {
            nombreEmpresa: 'Sika S.A Chile',
            rut: '91.947.000-3',
            direccion: 'Avda. Pdte. Salvador Allende 85, San Joaquin 8941077 Santiago',
            comuna: 'Buin',
            giro: 'Comercializacion',
            ciudad: 'Santiago',
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
      },
   ],
};
