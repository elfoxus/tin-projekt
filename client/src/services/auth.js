import React, {createContext, Fragment, useEffect, useReducer} from "react";
import { useLocation } from "react-router-dom";
import {decode, isTokenExpired} from "./jwtUtils";
import {refresh} from "./authUtils";

export const UserContext = createContext();

const AuthVerify = ({children}) => {
    let location = useLocation();

    const reducer = (state, action) => {
        switch (action.type) {
            case 'set':
                console.log(action.payload)
                return {
                    username: action.payload.username,
                    role: action.payload.role,
                }
            case 'logout':

                return {
                    username: null,
                    role: null,
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, decode(localStorage.getItem('token')), state => state);


    useEffect(() => {
        const {username, role} = decode(localStorage.getItem('token'));
        if (username && role) {
            if (isTokenExpired(localStorage.getItem('token'))) {
                async function refreshh() {
                    await refresh(); // refresh token or logout
                }
                refreshh(); // refresh token or logout
            }
        }
    }, [location, children]);

    return <UserContext.Provider value={{ state, dispatch }}>
        {children}
    </UserContext.Provider>
}

export default AuthVerify;