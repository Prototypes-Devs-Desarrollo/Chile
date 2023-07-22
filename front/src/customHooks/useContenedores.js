import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddContenedorMethod, ListContenedoresMethod } from '../../utils/metodos/metodosContenedores';
import { contSetContenedores } from '@/redux/reducer/reducerContenedor';
import { ValidoAddContenedor } from '../../utils/validaciones';

const initial = {
   nombreContenedor: '',
   fechaRDM: '',
   fechaEDC: '',
   tipo: '',
   importaciones: [],
   id: '',
};

const validaInitial = {
   valido: true,
};

export const useContenedores = (addHandleOpenCon) => {
   const dispatch = useDispatch();
   const { contenedoresCont, contenedorCont } = useSelector((state) => state.reducerContenedor);
   const [cardsCon, setCardsCon] = useState(true);
   const [erroresCon, setErroresCon] = useState(validaInitial);
   const [errorCon, setErrorCon] = useState('');
   const [successCon, setSuccessCon] = useState('');
   const [loadingCon, setLoadingCon] = useState(true);
   const [inputCon, setInputCon] = useState(initial);

   const onUseEffectCon = async () => {
      await ListContenedoresMethod({
         loading: (v) => setLoadingCon(v),
         error: (msg) => setErrorCon(msg),
         success: (res) => {
            dispatch(contSetContenedores(res.payload));
         },
      });
   };

   const onChangeAddCon = (e) => {
      setInputCon({
         ...input,
         [e.target.name]: e.target.value,
      });
      onClickAddCon(e);
   };

   const onClickAddCon = (e) => {
      setErroresCon(
         ValidoAddContenedor({
            ...input,
            [e.target.name]: e.target.value,
         })
      );
   };

   const onSubmitAddCon = async (e) => {
      e.preventDefault();
      if (errorCon) {
         setErrorCon('');
      }
      if (successCon) {
         setSuccessCon('');
      }

      // CONSOLE LOG TESTER OBJETO
      console.log(inputCon);

      if (erroresCon.valido) {
         await AddContenedorMethod({
            con: inputCon,
            loading: (v) => setLoadingCon(v),
            error: (msg) => setErrorCon(msg),
            success: async (res) => {
               // CONSOLE LOG TESTER RESPUESTA API
               console.log(res);

               await onUseEffectCon();
               addHandleOpenCon();
            },
         });
      }
   };

   const onClickCardsCon = () => setCardsCon(!cardsCon);

   const setContenedorNombre = (nombreContenedor) => setInputCon({ ...inputCon, nombreContenedor });
   const setContenedorFechaRDM = (fechaRDM) => setInputCon({ ...inputCon, fechaRDM });
   const setContenedorFechaEDC = (fechaEDC) => setInputCon({ ...inputCon, fechaEDC });
   const setContenedorTipo = (tipo) => setInputCon({ ...inputCon, tipo });
   const addContenedorImportacion = (i) => setInputCon({ ...inputCon, importaciones: [...inputCon.importaciones, i] });
   const delContenedorImportacion = (idImp) => setInputCon({ ...inputCon, importaciones: inputCon.importaciones.filter((x) => x.id !== idImp) });
   const cancelConImp = () => setInputCon({ ...inputCon, importaciones: [] });

   return {
      onClickCardsCon,
      onChangeAddCon,
      onClickAddCon,
      onSubmitAddCon,
      onUseEffectCon,
      cardsCon,
      contenedoresCont,
      contenedorCont,
      erroresCon,
      errorCon,
      successCon,
      loadingCon,
      setContenedorNombre,
      setContenedorFechaRDM,
      setContenedorFechaEDC,
      setContenedorTipo,
      addContenedorImportacion,
      delContenedorImportacion,
      setSuccessCon,
      setErrorCon,
   };
};
