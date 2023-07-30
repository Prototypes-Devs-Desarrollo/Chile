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
      contEditImpContenedor(state, action) {
         console.log('----------PAYLOAD---------', action.payload);
         const { idx, i } = action.payload;
         console.log('----------EDIT-------------', state.contenedorCont.importaciones[idx]);
         // state.contenedorCont.importaciones[idx] = i;
         return {
            ...state,
            contenedorCont: { ...state.contenedorCont, 'importaciones[0]': i },
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
      contEditImportacion(state, action) {
         const editImportacion = action.payload;
   
         // Buscamos el índice del objeto que tiene el mismo código que el objeto editado
         const indexToReplace = state.contenedorCont.importaciones.findIndex(
           (ele) => ele.codigo === editImportacion.codigo
         );
   
         if (indexToReplace !== -1) {
           // Si encontramos el objeto, lo eliminamos y luego insertamos el objeto editado en su posición
           state.contenedorCont.importaciones.splice(indexToReplace, 1, editImportacion);
         } else {
           // Si no encontramos el objeto, simplemente lo agregamos al final del arreglo
           state.contenedorCont.importaciones.push(editImportacion);
         }
       },
   
       // ... otros reducers ...
     
     },
   });

//ACA SE EXPORTAN LAS ACTIONS QUE SE CREAN AUTOMATICAMENTE MAS ARRIVA
export const { contSetContenedores, contEditImportacion, contSetContenedor, contAddImpContenedor, contLimpiarImpContenedor, contDelImpContenedor, contSetLoading, contSetError, contSetSuccess, contLimpiarContenedor, contEditImpContenedor } = reducerContenedor.actions;

//ACA SE EXPORTAN O EXPORTA EL REDUCER
export default reducerContenedor.reducer;
