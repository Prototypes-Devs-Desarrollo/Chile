import { configureStore } from '@reduxjs/toolkit';
import reducerAuth from '../reducer/reducerAuth';
import reducerClient from '../reducer/reducerClient';
import reducerImport from '../reducer/reducerImport';
import reducerProduc from '../reducer/reducerProduc';
import reducerBodega from '../reducer/reducerBodega';

const store = configureStore({
   reducer: {
      reducerAuth,
      reducerClient,
      reducerImport,
      reducerProduc,
      reducerBodega,
   },
});

export default store;
