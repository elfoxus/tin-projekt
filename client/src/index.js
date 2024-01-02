import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios";
import i18n from './services/i18n'; // do not delete this line

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';



createRoot(document.getElementById('root')).render(
        <App />
);