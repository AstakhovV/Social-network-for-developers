import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../Types/CommonTypes";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {userAPI} from "../api/users-api";
import {ResultCodesEnum} from "../api/api";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>
}

const usersReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed:true})
            }
        case 'users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(
                    state.users,
                    action.userId,
                    'id',
                    {followed:false})
            }
        case 'users/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'users/SET_CURRENT_PAGE': {
                return {...state, currentPage: action.currentPage}
        }
        case 'users/SET_TOTAL_USERS_COUNT': {
                return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'users/TOGGLE_IS_FETCHING': {
                return {...state, isFetching: action.isFetching}
        }
        case 'users/TOGGLE_IS_FOLLOWING_PROGRESS': {
                return {...state, followingInProgress: action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !=action.userId)
                }
        }
        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number)=> ({type: 'users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'users/UNFOLLOW', userId}as const),
    setUsers: (users: Array<UsersType>) => ({type: 'users/SET_USERS', users}as const),
    setCurrentPage: (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage}as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', totalUsersCount}as const),
    toogleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching}as const),
    toogleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId}as const)

}

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toogleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage))
        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(actions.toogleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setUsersTotalCount(data.totalCount)); //запрос количество пользователей с сервера
    }
}

export const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) =>{
    dispatch(actions.toogleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toogleFollowingProgress(false, userId))
}

export const follow = (userId: number):ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number):ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess)
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

export default usersReducer;