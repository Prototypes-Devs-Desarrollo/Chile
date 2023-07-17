import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   productosProd: [],
   productoProd: undefined,
};

//ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerProduc = createSlice({
   name: 'reducerProduc',
   initialState,
   reducers: {
      //ACA authSetUser ES TANTO EL TIPO COMO EL REDUCER Y EL ACTION COMO SE VE EN EL METODO QUE SE CONSTRUYE DE IGUAL FORMA SE REPLICAN TANTO REDUCER COMO ACTIONS CON DIFERENTES NOMBRES
      prodSetProductos(state, action) {
         return {
            ...state,
            productosProd: action.payload,
         };
      },
      prodSetProducto(state, action) {
         return {
            ...state,
            productoProd: action.payload,
         };
      },
   },
});

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { prodSetProductos, prodSetProducto } = reducerProduc.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerProduc.reducer;