import axios from 'axios';
import React, {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const api = axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

const AxiosInterceptor = ({children}) => {

    const [isSet, setIsSet] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const inter1 = api.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));

        const inter2 = api.interceptors.response.use((response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (!(error.response.status === 401 && !originalRequest._retry && originalRequest.url === '/api/auth/refresh')) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;
                try {
                    const response = await axios.get('/api/auth/refresh', {withCredentials: true});
                    localStorage.setItem('token', response.data.accessToken);
                    return axios(originalRequest);
                } catch (e) {
                    // redirect to login page
                    const awaitLogout = await axios.get('/api/auth/logout', {withCredentials: true}); // clear cookies
                    localStorage.removeItem('token');
                    navigate('/login')
                    return Promise.reject();
                }

            });
            setIsSet(true);
            return () => {
                api.interceptors.request.eject(inter1);
                api.interceptors.response.eject(inter2);
            }
    }, [navigate]);
    return <Fragment>{isSet && children}</Fragment>;
}

export default api;
export {AxiosInterceptor};