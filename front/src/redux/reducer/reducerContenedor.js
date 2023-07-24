import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   contenedoresCont: [],
   contenedorCont: {
      nombreContenedor: '',
      fechaRDM: '',
      fechaEDC: '',
      tipo: '',
      importaciones: [],
      id: '',
      packageTipo: '',
   },
   loadingCont: true,
   successCont: '',
   errorCont: '',
};

//ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerContenedor = createSlice({
   name: 'reducerContenedor',
   initialState,
   reducers: {
      //ACA authSetUser ES TANTO EL TIPO COMO EL REDUCER Y EL ACTION COMO SE VE EN EL METODO QUE SE CONSTRUYE DE IGUAL FORMA SE REPLICAN TANTO REDUCER COMO ACTIONS CON DIFERENTES NOMBRES
      contSetContenedores(state, action) {
         return {
            ...state,
            contenedoresCont: action.payload,
         };
      },
      contSetContenedor(state, action) {
         return {
            ...state,
            contenedorCont: action.payload,
         };
      },
      contAddImpContenedor(state, action) {
         return {
            ...state,
            contenedorCont: { ...state.contenedorCont, importaciones: [...state.contenedorCont.importaciones, ...action.payload] },
         };
      },
      contDelImpContenedor(state, action) {
         return {
            ...state,
            contenedorCont: { ...state.contenedorCont, importaciones: state.contenedorCont.importaciones.filter((x) => x.ordenCompra.numero !== action.payload) },
         };
      },
      contLimpiarImpContenedor(state, action) {
         return {
            ...state,
            contenedorCont: { ...state.contenedorCont, importaciones: [] },
         };
      },
      contLimpiarContenedor(state, action) {
         return {
            ...state,
            contenedorCont: { ...state.contenedorCont, nombreContenedor: '', fechaRDM: '', fechaEDC: '', tipo: '', importaciones: [], id: '', packageTipo: '' },
         };
      },
      contSetLoading(state, action) {
         return {
            ...state,
            loadingCont: action.payload,
         };
      },
      contSetError(state, action) {
         return {
            ...state,
            errorCont: action.payload,
         };
      },
      contSetSuccess(state, action) {
         return {
            ...state,
            successCont: action.payload,
         };
      },
   },
});

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { contSetContenedores, contSetContenedor, contAddImpContenedor, contLimpiarImpContenedor, contDelImpContenedor, contSetLoading, contSetError, contSetSuccess, contLimpiarContenedor } = reducerContenedor.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerContenedor.reducer;
