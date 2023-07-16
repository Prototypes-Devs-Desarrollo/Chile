import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   usuarioAuth: undefined,
   authenticatedAuth: false,
   loadingAuth: true,
   errorAuth: '',
   successAuth: '',
};

//ACA SE CREA EL REDUCER JUNTO CON LAS ACTIONS
const reducerAuth = createSlice({
   name: 'reducerAuth',
   initialState,
   reducers: {
    //ACA authSetUser ES TANTO EL TIPO COMO EL REDUCER Y EL ACTION COMO SE VE EN EL METODO QUE SE CONSTRUYE DE IGUAL FORMA SE REPLICAN TANTO REDUCER COMO ACTIONS CON DIFERENTES NOMBRES
      authSetUser(state, action) {
         return {
            ...state,
            usuarioAuth: action.payload,
            authenticatedAuth: true,
         };
      },
      authSetLoading(state, action) {
         return {
            ...state,
            loadingAuth: action.payload,
         };
      },
      authSignOut(state, action) {
         return {
            ...state,
            usuarioAuth: undefined,
            authenticatedAuth: false,
         };
      },
      authSetError(state, action) {
         return {
            ...state,
            errorAuth: action.payload,
         };
      },
      authSetSuccess(state, action) {
         return {
            ...state,
            successAuth: action.payload,
         };
      },
   },
});

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { authSetUser, authSetError, authSetLoading, authSetSuccess, authSignOut } = reducerAuth.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerAuth.reducer;