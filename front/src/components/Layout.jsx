import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from './all/Sidebar';
import { useAuth } from '@/customHooks/useAuth';
import { GetUserLocalMethod } from '../../utils/metodos/metodosAuth';
import { authSetError, authSetLoading, authSetUser } from '../redux/reducer/reducerAuth';
import Login from './Login';
import { Spinner } from '@material-tailwind/react';

const Layout = ({ children }) => {
   const dispatch = useDispatch();
   const { usuarioAuth, authenticatedAuth, loadingAuth, errorAuth, successAuth } = useSelector((state) => state.reducerAuth);

   useEffect(() => {
      getUserLocal();
   }, [dispatch]);

   const getUserLocal = async () => {
      await GetUserLocalMethod({
         loading: (v) => dispatch(authSetLoading(v)),
         error: (msg) => dispatch(authSetError(msg)),
         success: (res) => {
            dispatch(authSetUser(res.payload));
         },
      });
   };

   return (
      <>
         {loadingAuth ? (
            <Spinner className='h-20 w-20 mx-auto my-10' />
         ) : authenticatedAuth ? (
            <main className='flex w-screen h-screen'>
               <Sidebar />
               {children}
            </main>
         ) : (
            <Login />
         )}
      </>
   );
};

export default Layout;
