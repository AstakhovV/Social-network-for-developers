import React from "react";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    toogleIsFetching,
    setUsers,
    setUsersTotalCount,
    unfollow, toogleFollowingProgress
} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {userAPI} from "../../api/api";


class UsersContainer extends React.Component { // классовая компонента юзерсАПИ
    constructor(props) {
        super(props);
    } // конструктор можно не писать, если в нем больше ничего нет
    //  как в данном случае. pagination - постраничный вывод

    componentDidMount(): void {// ajax-запрос на сервер с помощью библиотеки axios
        this.props.toogleIsFetching(true)
        userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toogleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setUsersTotalCount(data.totalCount) //запрос количество пользователей с сервера
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.toogleIsFetching(true)
        this.props.setCurrentPage(pageNumber);

        userAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toogleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   onPageChanged={this.onPageChanged}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   toogleFollowingProgress={this.props.toogleFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(setIsFetchingAC(isFetching))
//         }
//
//     }
// } e
// dispatch оригинал, ниже укороченная версия

export default connect(mapStateToProps, {
        follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, toogleIsFetching, toogleFollowingProgress
    }
)(UsersContainer);