import { configureStore } from '@reduxjs/toolkit';
import reducerAuth from '../reducer/reducerAuth';

const store = configureStore({
   reducer: {
      reducerAuth,
   },
});

export default store;
