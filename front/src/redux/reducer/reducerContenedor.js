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
      contSetContenedore(state, action) {
         return {
            ...state,
            contenedorCont: action.payload,
         };
      },
   },
});

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { contSetContenedores, contSetContenedore } = reducerContenedor.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerContenedor.reducer;
