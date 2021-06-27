import React from 'react';
import MyPostsContainer from "./Posts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../Common/Preloader/Preloader";
import {ProfileType} from "../../Types/CommonTypes";


type PropsType = {
    profile: ProfileType | null
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile:ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         isOwner={props.isOwner}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
            />
            <MyPostsContainer
                profile={props.profile}
                isOwner={props.isOwner}
            />
        </div>
    )
}

export default Profile;