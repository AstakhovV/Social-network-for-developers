import React from 'react';
import MyPostsContainer from "./Posts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../Common/Preloader/Preloader";

const Profile = (props) => {
    if (!props.profile){
        return <Preloader/>
    }

    return (
        <div>
           <ProfileInfo profile={props.profile}/>
           <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;