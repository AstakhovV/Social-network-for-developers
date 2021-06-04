import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = `auth/SET_USER_DATA`
const GET_CAPTCHA_URL_SUCCESS = `auth/GET_CAPTCHA_URL_SUCCESS`

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case  SET_USER_DATA:
        case  GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
                }
        default:
            return state;
    }
}

export const setUserData= (userId, email, login, isAuth, captchaUrl) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth, captchaUrl}});
export const getCaptchaUrlSuccess= (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setUserData(id, email, login, true))
        }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())

        }
        let message = response.data.messages.length > 0
            ? response.data.messages[0]
            : 'Some error'
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false, null))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;