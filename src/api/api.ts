import axios from "axios";
import {UsersType} from "../Types/CommonTypes";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', // базовый уровень автоматически приклеивается к запросу
    headers: {'API-KEY': '57712655-0808-4238-96f5-835cf3209f20'}
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}