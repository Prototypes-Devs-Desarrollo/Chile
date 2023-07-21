import { configureStore } from '@reduxjs/toolkit';
import reducerAuth from '../reducer/reducerAuth';
import reducerClient from '../reducer/reducerClient';
import reducerImport from '../reducer/reducerImport';
import reducerProduc from '../reducer/reducerProduc';
import reducerBodega from '../reducer/reducerBodega';
import reducerProviders from '../reducer/reducerProviders';
import reducerOrden from '../reducer/reducerOrden';
import reducerContenedor from '../reducer/reducerContenedor';

const store = configureStore({
   reducer: {
      reducerAuth,
      reducerClient,
      reducerImport,
      reducerProduc,
      reducerBodega,
      reducerProviders,
      reducerOrden,
      reducerContenedor,
   },
});

export default store;
