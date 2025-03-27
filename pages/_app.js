import React from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { wrapper } from "@/redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Provider store={store}>
        <Component {...props.pageProps} />
        <ToastContainer autoClose={2000} />
      </Provider>
    </>
  );
}

export default MyApp;
