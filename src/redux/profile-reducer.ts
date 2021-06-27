import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/CommonTypes";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {ResultCodesEnum} from "../api/api";


let initialState = {
    posts: [{id: 1, message: 'Hi, how are you?', likesCount: 23},
        {id: 2, message: 'It is my first project', likesCount: 122}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText: '' as string | null
};


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/ADD-POST': {
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
        case 'profile/SET_USER_PROFILE':
            return {
                ...state, profile: action.profile
            }
        case 'profile/SET_STATUS':
            return {
                ...state, status: action.status
            }
        case 'profile/DELETE_POST':
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        case 'profile/SAVE_PHOTO_SUCCESS':
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}
export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'profile/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'profile/SAVE_PHOTO_SUCCESS', photos} as const)
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('UserId cant be null')
        }

    } else {
        dispatch(stopSubmit('editProfile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType | FormAction>
type ActionsType = InferActionsTypes<typeof actions>

export default profileReducer;