import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount(): void {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile()
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect (mapStateToProps, {getUserProfile} )(withUrlDataContainerComponent);