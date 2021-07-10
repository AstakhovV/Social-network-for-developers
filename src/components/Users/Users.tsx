import React, {useEffect} from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../Types/CommonTypes";
import UsersSearchForm from "./UsersSearcForm";
import {FilterType, follow, getUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersState
} from "../../redux/users-selectors";

type PropsType = {
    portionSize?: number,
}

export const Users: React.FC<PropsType> = (props) => {

    const users: Array<UsersType> = useSelector(getUsersState)
    const totalUsersCount: number = useSelector(getTotalUsersCount)
    const pageSize: number = useSelector(getPageSize)
    const currentPage: number = useSelector(getCurrentPage)
    const filter: FilterType = useSelector(getUsersFilter)
    const followingInProgress: Array<number> = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUsers(currentPage, pageSize, filter));
    }, [])

    const onPageChanged = (pageNumber: number) =>{
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))

    }
    const followSuccess = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowSuccess = (userId: number) => {
        dispatch(unfollow(userId))

    }

        return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount}
                       pageSize={pageSize}/>
            <div>
                {users.map(u => <User user={u} key={u.id}
                                      followingInProgress={followingInProgress}
                                      unfollow={unfollowSuccess}
                                      follow={followSuccess}/>
                )}
            </div>

        </div>
    )
}