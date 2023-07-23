import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   importacionesImpo: [],
   importacionImpo: {
      codigo: '',
      fechaRDM: '',
      descripcionProducto: '',
      cantidadSolicitada: '',
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
   },
};

//ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerImport = createSlice({
   name: 'reducerImport',
   initialState,
   reducers: {
      //ACA authSetUser ES TANTO EL TIPO COMO EL REDUCER Y EL ACTION COMO SE VE EN EL METODO QUE SE CONSTRUYE DE IGUAL FORMA SE REPLICAN TANTO REDUCER COMO ACTIONS CON DIFERENTES NOMBRES
      impoSetImportaciones(state, action) {
         return {
            ...state,
            importacionesImpo: action.payload,
         };
      },
      impoSetImportacion(state, action) {
         return {
            ...state,
            importacionImpo: action.payload,
         };
      },
   },
});

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { impoSetImportaciones, impoSetImportacion } = reducerImport.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerImport.reducer;
