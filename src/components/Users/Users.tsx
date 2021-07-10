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
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type PropsType = {
    portionSize?: number,
}

type QueryParamsType = { term?: string, page?: string, friend?: string };
export const Users: React.FC<PropsType> = (props) => {

    const users: Array<UsersType> = useSelector(getUsersState)
    const totalUsersCount: number = useSelector(getTotalUsersCount)
    const pageSize: number = useSelector(getPageSize)
    const currentPage: number = useSelector(getCurrentPage)
    const filter: FilterType = useSelector(getUsersFilter)
    const followingInProgress: Array<number> = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(()=>{
        const parsed = queryString.parse(history.location.search.substr(1))  as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter
        if(!!parsed.page) actualPage = Number(parsed.page)
        if(!!parsed.term) actualFilter = {...actualFilter, term:parsed.term as string}
        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, [])

    useEffect(()=>{
        const query: QueryParamsType = {}

        if(!!filter.term) query.term = filter.term
        if(currentPage !==1) query.page = String(currentPage)
        if(filter.friend !== null) query.friend = String(filter.friend)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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