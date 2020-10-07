import creatDataContext from './CreateDataContext';
import userApi from '../api/user';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../helpers/NavigationRef';
import axios from 'axios';

const authReducer = (state, action) => {

    switch (action.type) {
        case "add_error":
            return { ...state, error_msg: action.payload };
        case 'addToken':
            return { ...state, error_msg: '', token: action.payload };
        case 'rmToken':
            return { ...state, error_msg: '', token: null };
        case 'resetPwd_error':
            return { error_msg: action.payload, response_msg: "", token: null };
        case 'resetPwd':
            return { response_msg: action.payload, error_msg: "", token: null };
        case 'signup':
            return { response_msg: action.payload, error_msg: "", token: null };
        case 'hideMsg':
            return { ...state, response_msg: "", error_msg: "" };
        case 'addTokenDeezer':
            return { ...state, deezerToken: action.payload };
        case 'rmTokenDeezer':
            return { ...state, deezerToken: action.payload };
        default:
            return state;
    }
};

const userNameRegex = /^[a-zA-Z0-9]*$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;


const hideMessages = dispatch => async () => {
    setTimeout(() => {
        dispatch({ type: "hideMsg" })
    }, 2000)
}

const signup = dispatch => async ({ username, email, password }) => {
    try {
        if (!username || !userNameRegex.test(username)) {
            dispatch({ type: "add_error", payload: "Invalid username" });
            return;
        }
        if (!emailRegex.test(email)) {
            dispatch({ type: "add_error", payload: "Invalid email" });
            return;
        }
        if (!passwordRegex.test(password)) {
            dispatch({ type: "add_error", payload: "Invalid password" });
            return;
        }

        let response = await userApi.post('/users/signup', { username, email, password });
        if (response.data.code !== 200) {
            dispatch({ type: "add_error", payload: response.data.data.msg })
        } else if (response.data.code === 200) {
            dispatch({ type: "signup", payload: response.data.data.msg });
        }
    } catch (err) {
        dispatch({ type: "add_error", payload: "Sorry, something went wrong with signup" })
        console.error(err.message)
    }
}

const signin = dispatch => async ({ email, password }) => {
    try {
        if (!emailRegex.test(email)) {
            dispatch({ type: "add_error", payload: "Invalid email" });
            return;
        }
        if (!passwordRegex.test(password)) {
            dispatch({ type: "add_error", payload: "Invalid password" });
            return;
        }

        let response = await userApi.post('/users/signin', { email, password });
        if (response.data.code !== 200) {
            dispatch({ type: "add_error", payload: response.data.data.msg })
        }
        if (response.data.code == 200) {
            await AsyncStorage.setItem('token_id', response.data.data.token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.data));
            dispatch({ type: 'addToken', payload: response.data.data.token });
        }
    } catch (err) {
        dispatch({ type: "add_error", payload: "Sorry, something went wrong with signin" })
        console.error(err.message)
    }
}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token_id');
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.clear();
    dispatch({ type: 'rmToken', payload: null });
}

const resetPwd = dispatch => async (email) => {
    try {
        if (!emailRegex.test(email.email)) {
            dispatch({ type: "add_error", payload: "Invalid email" });
            return;
        }

        let response = await userApi.post('/users/resetpwd', { email });
        if (response.data.code !== 200) {
            dispatch({ type: "resetPwd_error", payload: response.data.data.msg })
        }
        if (response.data.code == 200) {
            dispatch({ type: 'resetPwd', payload: response.data.data.msg })
        }
    } catch (err) {
        dispatch({ type: "resetPwd_error", payload: "Sorry, something went wrong with signin" })
        console.error(err.message)
    }
}

const oauth2google = dispatch => async ({ token, userId }) => {
    await AsyncStorage.setItem('token_id', token);
    await AsyncStorage.setItem('userInfo', JSON.stringify({ userId: userId }));
    dispatch({ type: 'addToken', payload: token })
}

const oauth2deezer = dispatch => async (state, token_deezer) => {
    await AsyncStorage.setItem('token_deezer', token_deezer);
    dispatch({ type: 'addTokenDeezer', payload: token_deezer });
}

const logoutDeezer = dispatch => async () => {
    await AsyncStorage.removeItem('token_deezer');
    dispatch({ type: 'rmTokenDeezer', payload: null });
}

export const { Context, Provider } = creatDataContext(
    authReducer,
    { signup, signin, signout, resetPwd, hideMessages, oauth2google, logoutDeezer, oauth2deezer },
    {
        token: null,
        deezerToken: null,
        error_msg: "",
        response_msg: "",
    }
)