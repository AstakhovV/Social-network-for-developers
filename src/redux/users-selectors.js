import {createSelector} from "reselect";

export const getUsersState = (state) => {
    return state.usersPage.users
}
/*export const getUsersStateSelector = (state) => {
    return getUsersState(state).filter(u => true)
}*/

// сложный селектор делать через библиотеку
export const getUsersStateSuper = createSelector(getUsersState, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}