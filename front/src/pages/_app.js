import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
}
 