import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import 'tailwindcss/tailwind.css';
import { Sidebar } from "@/components/sidebar/sidebar";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  
  const router = useRouter()
  const isHomePage = router.pathname === '/';

  return (
    <Provider store={store}>
      <div className={isHomePage ? null : `flex flex-nowrap`}>
     {isHomePage? null :  <Sidebar />}   
         <Component {...pageProps} />
      </div>
    </Provider>
  );
}
 