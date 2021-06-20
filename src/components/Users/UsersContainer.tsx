import React from "react";
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    getUsers,
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
import {UsersType} from "../../Types/CommonTypes";
import {AppStateType} from "../../redux/redux-store";


type mapStateToPropsType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    followingInProgress: Array<number>,
    isFetching: boolean,
    currentPage: number,
}

type mapDispatchToPropsType = {
    getUsers: (pageSize: number,currentPage: number) => void
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
}

type OwnPropsType = {
    pageTitle: string,
}

type PropsType = mapDispatchToPropsType & mapStateToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props // деструктуризация внутри метода
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   onPageChanged={this.onPageChanged}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getUsersState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(connect< mapStateToPropsType,mapDispatchToPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, {
        follow, unfollow, getUsers
    }), WithAuthRedirect
)(UsersContainer)