import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import authActionReducer from '../actionsreducers/authActionReducer.slice.js';

const store = configureStore({
  reducer: {
    authReducer: authActionReducer,
    // Otros reducers aquí si los tienes
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };