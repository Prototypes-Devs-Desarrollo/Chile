import { createSlice } from '@reduxjs/toolkit';

//SE INICIA OBJETO DEL REDUCER
const initialState = {
   importacionesImpo: [],
   importacionImpo: undefined,
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