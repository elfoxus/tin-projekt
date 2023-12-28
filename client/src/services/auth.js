import { jwtDecode } from 'jwt-decode';


const useAuth = () => {
    const token = localStorage.getItem('token');

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded);
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

export default useAuth;