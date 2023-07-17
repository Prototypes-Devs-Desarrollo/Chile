import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   bodegasBode: [],
   bodegaBode: undefined,
};

//ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerBodega = createSlice({
   name: 'reducerBodega',
   initialState,
   reducers: {
      //ACA authSetUser ES TANTO EL TIPO COMO EL REDUCER Y EL ACTION COMO SE VE EN EL METODO QUE SE CONSTRUYE DE IGUAL FORMA SE REPLICAN TANTO REDUCER COMO ACTIONS CON DIFERENTES NOMBRES
      bodeSetBodegas(state, action) {
         return {
            ...state,
            bodegasBode: action.payload,
         };
      },
      bodeSetBodega(state, action) {
         return {
            ...state,
            bodegaBode: action.payload,
         };
      },
   },
});

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { bodeSetBodegas, bodeSetBodega } = reducerBodega.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerBodega.reducer;