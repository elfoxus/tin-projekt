import api from "./api";
import {decode} from "./jwtUtils";


const login = (username, password) => {
    return api.post('/auth', {
        username: username,
        password: password
    })
        .then(response => {
            let token = response.data.accessToken;
            console.log(token);
            localStorage.setItem('token', token);
            return decode(token)
        }).catch(error => {
            console.log(error.response.data)
        })
}

const logout = () => {
    return api.get('/auth/logout')
        .then(response => {
            localStorage.removeItem('token');
        }).catch(error => {
            console.log(error.response.data);
        })
}

// refresh token or logout
const refresh = () => {
    return api.get('/auth/refresh')
        .then(response => {
            localStorage.setItem('token', response.data.accessToken);
            console.log('Token refreshed')
        }).catch(async (error) => {
            await logout()
                .then(() => {
                    console.log('User logged out');
                }).catch(error => {
                    console.log(error.response.data);
                })
        })
}


export {login, logout, refresh};