import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!(error.response.status === 401 && !originalRequest._retry)) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;
        try {
            const response = await axios.get('/api/auth/refresh', {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return axios(originalRequest);
        } catch (e) {
            // redirect to login page
            window.location.href = '/login'; // will refresh the page and reset the state of the application!
            return Promise.reject();
        }

    });

export default api;