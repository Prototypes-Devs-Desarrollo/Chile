import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout';

axios.defaults.baseURL = 'http://localhost:8080/v1/';

export default function App({ Component, pageProps }) {
   const router = useRouter();
   const isHomePage = router.pathname === '/';

   return (
      <Provider store={store}>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </Provider>
   );
}
