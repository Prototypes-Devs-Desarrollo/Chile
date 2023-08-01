import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUserMethod } from '../../utils/metodos/metodosAuth';
import { authSetError, authSetLoading, authSetUser } from '../redux/reducer/reducerAuth';
import { ListProductosMethod } from '../../utils/metodos/metodosProductos';
import { prodSetProductos } from '@/redux/reducer/reducerProduc';

export const useAuth = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();


   const handleSubmit = async (e) => {
      e.preventDefault();
     await LoginUserMethod({
        email,
        password,
        loading: (v) => dispatch(authSetLoading(v)),
        error: (msg) => dispatch(authSetError(msg)),
        success: async (res) => {
          dispatch(authSetUser(res.payload.user));
          await ListProductosMethod({
          loading: (v) => dispatch(authSetLoading(v)),
            error: (msg) => dispatch(authSetError(msg)),
            success: (res) =>  dispatch(prodSetProductos(res)),
          });
        },
      });
    };

   return {
      handleSubmit,
      email,
      setEmail,
      password,
      setPassword,
   };
};
