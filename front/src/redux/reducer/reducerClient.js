import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   clientesClie: [],
   clienteClie: undefined,
};

//ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerClient = createSlice({
   name: 'reducerClient',
   initialState,
   reducers: {
      //ACA authSetUser ES TANTO EL TIPO COMO EL REDUCER Y EL ACTION COMO SE VE EN EL METODO QUE SE CONSTRUYE DE IGUAL FORMA SE REPLICAN TANTO REDUCER COMO ACTIONS CON DIFERENTES NOMBRES
      clieSetClientes(state, action) {
         return {
            ...state,
            clientesClie: action.payload,
         };
      },
      clieSetCliente(state, action) {
         return {
            ...state,
            clienteClie: action.payload,
         };
      },
   },
});

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { clieSetClientes, clieSetCliente } = reducerClient.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerClient.reducer;
