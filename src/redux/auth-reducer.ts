import {ResultCodeCaptchaEnum, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string |null,
    isAuth: false as boolean,
    captchaUrl: null as string |null
}


const authReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case  `auth/SET_USER_DATA`:
        case  `auth/GET_CAPTCHA_URL_SUCCESS`:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

const actions = {
    setUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl:string | null) => ({type: `auth/SET_USER_DATA`, payload: {userId, email, login, isAuth, captchaUrl}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: `auth/GET_CAPTCHA_URL_SUCCESS`, payload: {captchaUrl}} as const)

}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setUserData(id, email, login, true, null))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {

    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())

        }
        let message = loginData.messages.length > 0
            ? loginData.messages[0]
            : 'Some error'
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserData(null, null, null, false, null))
    }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch: any) => {
    let data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType | FormAction>
type ActionsType = InferActionsTypes<typeof actions>

export default authReducer;