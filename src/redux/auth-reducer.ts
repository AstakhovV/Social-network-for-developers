import {authAPI, ResultCodeCaptcha, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = `auth/SET_USER_DATA`
const GET_CAPTCHA_URL_SUCCESS = `auth/GET_CAPTCHA_URL_SUCCESS`


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string |null,
    isAuth: false as boolean,
    captchaUrl: null as string |null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case  SET_USER_DATA:
        case  GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export type setUserDataActionTypePayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
    captchaUrl:string | null
}

export type setUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setUserDataActionTypePayloadType
}

export type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}


export const setUserData= (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl:string | null):setUserDataActionType => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth, captchaUrl}});
export const getCaptchaUrlSuccess= (captchaUrl: string):getCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setUserData(id, email, login, true, null))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {

    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())

        }
        let message = loginData.messages.length > 0
            ? loginData.messages[0]
            : 'Some error'
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false, null))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;