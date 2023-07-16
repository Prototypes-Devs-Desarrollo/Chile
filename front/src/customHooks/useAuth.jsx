import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUserMethod } from '../../utils/metodos/metodosAuth';
import { authSetError, authSetLoading, authSetUser } from '../redux/reducer/reducerAuth';

export const useAuth = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();

   const handleSubmit = async (e) => {
      e.preventDefault();
      LoginUserMethod({
         email,
         password,
         loading: (v) => dispatch(authSetLoading(v)),
         error: (msg) => dispatch(authSetError(msg)),
         success: async (res) => dispatch(authSetUser(res.payload.user)),
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
