import {instance, APIResponseType, ResultCodeCaptchaEnum, ResultCodesEnum} from "./api";

type MeResponseDataType = {
    id: number, email: string, login: string
}
type LoginResponseDataType = {
    userId: number
}
export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeCaptchaEnum>>(`auth/login`, {
            // @ts-ignore
            email, password, rememberMe, captcha
            // @ts-ignore
        }).then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`).then(res => res)
    }
}
