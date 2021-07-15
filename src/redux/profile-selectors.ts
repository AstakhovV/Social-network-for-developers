import {AppStateType} from "./redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}
export const getStatusProfile = (state: AppStateType) => {
    return state.profilePage.status
}
export const getAuthUserID = (state: AppStateType) => {
    return state.auth.userId
}
export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts
}

