import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../Types/CommonTypes";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
}

let Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return (
        <div>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount}
                       pageSize={pageSize}/>
            <div>
                {users.map(u => <User user={u} key={u.id}
                                      followingInProgress={props.followingInProgress}
                                      unfollow={props.unfollow}
                                      follow={props.follow}/>
                )}
            </div>

        </div>
    )
}
export default Users