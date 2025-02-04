import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./index.css"
import {Toaster} from 'react-hot-toast'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App />
      <Toaster /> 
    </BrowserRouter>,
)
