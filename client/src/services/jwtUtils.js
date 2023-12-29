import {jwtDecode} from "jwt-decode";

const decode = (token) => {
    if (token) {
        const decoded = jwtDecode(token);
        return {
            username: decoded.user.username,
            role: decoded.user.role,
        }
    }

    return {
        username: null,
        role: null,
    }
}

const isTokenExpired = (token) => {
    if (token) {
        const decoded = jwtDecode(token);
        return decoded.exp < Date.now() / 1000;
    }
    return true;
}

export {decode, isTokenExpired};