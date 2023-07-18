import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
    Providers: [],
    Provider: undefined,
 };

 //ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerProviders = createSlice({
    name: 'reducerProviders',
    initialState,
    reducers: {
       //ACA authSetUser ES TANTO EL TIPO COMO EL REDUCER Y EL ACTION COMO SE VE EN EL METODO QUE SE CONSTRUYE DE IGUAL FORMA SE REPLICAN TANTO REDUCER COMO ACTIONS CON DIFERENTES NOMBRES
       provSetProviders(state, action) {
          return {
             ...state,
             Providers: action.payload,
          };
       },
       provSetProvider(state, action) {
          return {
             ...state,
             Provider: action.payload,
          };
       },
    },
 });
 //ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { provSetProviders, provSetProvider } = reducerProviders.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerProviders.reducer;