// =========================================================
// * Volt React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * Official Repository: https://github.com/themesberg/volt-react-dashboard
// * License: MIT License (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store, persistor } from './app/store';



import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
// import { PersistGate } from 'redux-persist-toolkit/integration/react';
import { persistor, store } from './store/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >

      
        <HashRouter persistor={persistor}>
          <ScrollToTop />
          <HomePage />
        </HashRouter>
     
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();


