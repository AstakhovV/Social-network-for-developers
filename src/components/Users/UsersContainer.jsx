import React from "react";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    toogleIsFetching,
    setUsers,
    setUsersTotalCount,
    unfollow, toogleFollowingProgress,
    getUsers
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getUsersState,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount
} from "../../redux/users-selectors";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

class UsersContainer extends React.Component { // классовая компонента юзерсАПИ
    constructor(props) {
        super(props);
    } // конструктор можно не писать, если в нем больше ничего нет
    //  как в данном случае. pagination - постраничный вывод

    componentDidMount() {
        const {currentPage, pageSize} = this.props // деструктуризация внутри метода
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
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
        users: getUsersState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose( connect(mapStateToProps,
    {
        follow, unfollow, setUsers, setCurrentPage,
        setUsersTotalCount, toogleIsFetching, toogleFollowingProgress,
        getUsers
    }),  WithAuthRedirect
)(UsersContainer)