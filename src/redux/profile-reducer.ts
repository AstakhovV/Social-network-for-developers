import {profileAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/CommonTypes";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'



let initialState = {
    posts: [{id: 1, message: 'Hi, how are you?', likesCount: 23},
        {id: 2, message: 'It is my first project', likesCount: 122}
        ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText: '' as string | null
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type addPostActionCreatorActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

type setStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
type deletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const addPostActionCreator = (newPostText: string): addPostActionCreatorActionType => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type:SET_USER_PROFILE, profile});
export const setStatus = (status: string): setStatusActionType => ({type:SET_STATUS, status});
export const deletePost = (postId: number):deletePostActionType => ({type:DELETE_POST, postId});
export const savePhotoSuccess = (photos: PhotosType):savePhotoSuccessActionType => ({type:SAVE_PHOTO_SUCCESS, photos});




export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await userAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    let userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
    else {
        dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;