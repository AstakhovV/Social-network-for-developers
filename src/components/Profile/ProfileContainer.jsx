import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component {

    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/22`)
            .then(response => {
                this.props.setUserProfile(response.data.items)
            })
    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => ({
    a: 13
})

export default connect (mapStateToProps, {setUserProfile} )(ProfileContainer);