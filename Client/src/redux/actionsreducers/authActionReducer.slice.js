import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
};

// Estado inicial
const initialState = {
  usuarioAuth: undefined,
  authenticatedAuth: false,
  loadingAuth: false,
  errorAuth: '',
  needVerificationAuth: false,
  successAuth: '',
  bets: undefined,
};

// Creación del slice del reducer
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
        loadingAuth: false,
      };
    },
    authSetError(state, action) {
      return {
        ...state,
        errorAuth: action.payload,
      };
    },
    authNeedVerification(state, action) {
      return {
        ...state,
        needVerificationAuth: true,
      };
    },
    authSetSuccess(state, action) {
      return {
        ...state,
        successAuth: action.payload,
      };
    },
    setBets(state, action) {
      return {
        ...state,
        bets: action.payload,
      };
    },
    logout(state, action) {
      return {
        ...state,
        usuarioAuth: undefined,
        authenticatedAuth: false,
        loadingAuth: false,
        errorAuth: '',
        needVerificationAuth: false,
        successAuth: '',
        bets: undefined,
      };
    },
  },
});

// Aplicar la configuración de persistencia al reducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

// Exportar acciones del slice del reducer
export const {
  authSetUser,
  setBets,
  authNeedVerification,
  authSetError,
  authSetLoading,
  authSetSuccess,
  authSignOut,
  logout,
} = authSlice.actions;

// Exportar el reducer persistido
export default persistedAuthReducer;