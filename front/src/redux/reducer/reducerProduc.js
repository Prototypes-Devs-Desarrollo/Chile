import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   productosProd: [],
   productos: undefined,
   productoProd: undefined,
};

//ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerProduc = createSlice({
   name: 'reducerProduc',
   initialState,
   reducers: {
     setProducts(state, action) {
       return {
         ...state,
         productos: action.payload,
       };
     },
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
export const { prodSetProductos, prodSetProductom, setProducts } = reducerProduc.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerProduc.reducer;