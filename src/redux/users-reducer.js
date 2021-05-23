import {userAPI as userApi, userAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    pageSize:5,
    totalUsersCount: 0,
    currentPage: 1 ,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case  FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case  UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
                return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
                return {...state, totalUsersCount: action.count}
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


export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count:totalUsersCount});
export const toogleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toogleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});


export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toogleIsFetching(true));
        userAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toogleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setCurrentPage(currentPage))
            dispatch(setUsersTotalCount(data.totalCount)); //запрос количество пользователей с сервера
        })
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toogleFollowingProgress(true, userId))
        userApi.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toogleFollowingProgress(false, userId))
            })
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toogleFollowingProgress(true, userId))
        userApi.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toogleFollowingProgress(false, userId))
            })
    }
}

export default usersReducer;