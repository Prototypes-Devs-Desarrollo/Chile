import { configureStore } from '@reduxjs/toolkit';
import reducerAuth from '../reducer/reducerAuth';
import reducerClient from '../reducer/reducerClient';

const store = configureStore({
   reducer: {
      reducerAuth,
      reducerClient: reducerClient
   },
});

export default store;
