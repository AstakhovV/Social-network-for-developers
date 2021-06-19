import {userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../Types/CommonTypes";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>
}
export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case  FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed:true})
            }
        case  UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed:false})
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
                return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
                return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
                return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
                return {...state, followingInProgress: action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !=action.userId)
                }
        }
        default:
            return state;
    }
}
type followSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}
type unfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
type setUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
type setUsersTotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number,
}
type toogleIsFetching = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

type toogleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}



export const followSuccess = (userId: number):followSuccessActionType => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<UsersType>): setUsersActionType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCount = (totalUsersCount: number): setUsersTotalCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toogleIsFetching = (isFetching: boolean): toogleIsFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toogleFollowingProgress = (isFetching: boolean, userId: number): toogleFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});


export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toogleIsFetching(true));
        dispatch(setCurrentPage(currentPage))
        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(toogleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount)); //запрос количество пользователей с сервера
    }
}

export const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) =>{
    dispatch(toogleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toogleFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess)
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess)
    }
}

export default usersReducer;