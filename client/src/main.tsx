// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Auth0Provider
      domain="dev-n5pc0snwkkz5hylw.us.auth0.com"
      clientId="tNrUrSAkwOIEA5lZf35AKf4YYGPLThf1"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
    ,
  </>
);
