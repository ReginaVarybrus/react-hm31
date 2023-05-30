import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios";
import { store } from './store/store'
import { Provider } from 'react-redux'

axios.defaults.baseURL = 'https://rickandmortyapi.com/api/';

const rootElement = document.getElementById("root")

const root = ReactDOM.createRoot(rootElement!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


