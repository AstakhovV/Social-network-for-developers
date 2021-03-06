import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../Types/CommonTypes";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
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
        case 'users/SET_FILTER': {
            return {...state, filter: action.payload}
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
    setFilter: (filter: FilterType) => ({type: 'users/SET_FILTER', payload:filter} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', totalUsersCount}as const),
    toogleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching}as const),
    toogleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId}as const)

}

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toogleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toogleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setUsersTotalCount(data.totalCount)); //???????????? ???????????????????? ?????????????????????????? ?? ??????????????
    }
}

export const _followUnfollowFlow = async (dispatch: DispatchType,
                                          userId: number,
                                          apiMethod: (userId: number) => Promise<APIResponseType>,
                                          actionCreator: (userId: number) => ActionsType) =>{
    dispatch(actions.toogleFollowingProgress(true, userId))
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toogleFollowingProgress(false, userId))
}

export const follow = (userId: number):ThunkType => {
    return async (dispatch) => {
         await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number):ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

export default usersReducer;