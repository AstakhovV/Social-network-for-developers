import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../Common/Preloader/Preloader";
import {ProfileType} from "../../Types/CommonTypes";
import {Col, Divider, Row} from "antd";
import MyPosts from "./Posts/MyPosts";


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
            <Divider orientation="left">Profile Info</Divider>
            <Row>
                <Col flex={3}>
                    <ProfileInfo profile={props.profile}
                                 isOwner={props.isOwner}
                                 status={props.status}
                                 updateStatus={props.updateStatus}
                                 savePhoto={props.savePhoto}
                                 saveProfile={props.saveProfile}
                    />
                </Col>
                <Col flex={3}>
                    <MyPosts
                        profile={props.profile}
                        isOwner={props.isOwner}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Profile;