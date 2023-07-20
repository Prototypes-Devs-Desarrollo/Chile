import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   ordenesOrde: [],
   ordenOrde: undefined,
};

//ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerOrden = createSlice({
   name: 'reducerOrden',
   initialState,
   reducers: {
      //ACA authSetUser ES TANTO EL TIPO COMO EL REDUCER Y EL ACTION COMO SE VE EN EL METODO QUE SE CONSTRUYE DE IGUAL FORMA SE REPLICAN TANTO REDUCER COMO ACTIONS CON DIFERENTES NOMBRES
      ordeSetOrdenes(state, action) {
         return {
            ...state,
            ordenesOrde: action.payload,
         };
      },
      ordeSetOrden(state, action) {
         return {
            ...state,
            ordenOrde: action.payload,
         };
      },
   },
});

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { ordeSetOrdenes, ordeSetOrden } = reducerOrden.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerOrden.reducer;