import axios from "axios";
import {UsersType} from "../Types/CommonTypes";

const API_KEY = process.env.REACT_APP_API_KEY

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', // базовый уровень автоматически приклеивается к запросу
    headers: {'API-KEY': API_KEY}
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