import React from 'react';
import s from '../Profile.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                ProfileInfo
            </div>
            <div className={s.item}>
                <img src={props.profile.photos.large} width={100} height={100}/>
                <div>
                    Name:
                    {props.profile.fullName}
                    <ProfileStatusWithHooks status={props.status}
                    updateStatus={props.updateStatus}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;