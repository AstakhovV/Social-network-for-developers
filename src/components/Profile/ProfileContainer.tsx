import React, {ComponentType} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../Types/CommonTypes";
import {getAuthUserID, getIsAuth, getProfile, getStatusProfile} from '../../redux/profile-selectors';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile () {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                // todo: replace push with Redirect
                this.props.history.push ('/login');
            }
        }
        if (!userId) {
            console.error('ID should exists in URI params or in state')
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }

    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps:PropsType, prevStat: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId){
        this.refreshProfile()
    }}

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: getProfile(state),
    status: getStatusProfile(state),
    authorizedUserId: getAuthUserID(state),
    isAuth: getIsAuth(state),
})

export default compose<ComponentType>(connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}), withRouter, WithAuthRedirect)(ProfileContainer)
