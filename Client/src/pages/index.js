import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetUserLogeado } from '../../lib/metodosFirebase';
import { authSetLoading, authSetError, authSetUser } from '@/redux/actionsreducers/authActionReducer.slice';
import Login from './auth/login';
import { Hero } from '@/components/landing/Hero';
import { Prices } from '@/components/landing/Prices';
import { Footer } from '@/components/landing/Footer';
import NavBarComp from '@/components/landing/navBarComp';
export default function Home() {
   const dispatch = useDispatch();
   const { authenticatedAuth, loadingAuth, errorAuth } = useSelector((state) => state.authReducer);


   return (
      <>
<p>pagina de inicio</p>
</>
   );
}
