import React, {useContext} from 'react';
import decode from 'jwt-decode';

// Import context
import { Context as AuthContext } from '../context/AuthContext';

const CheckAuth = async () => {
    const { state } = useContext(AuthContext);
    const token = state.token;

    console.log("token :", token);

    if (!token) {
        return false;
    }

    try {
        // { exp: 12903819203 }
        const { exp } = decode(token);

        if (exp < new Date().getTime() / 1000) {
            return false;
        }

    } catch (e) {
        return false;
    }

    return true;
}


export default CheckAuth;