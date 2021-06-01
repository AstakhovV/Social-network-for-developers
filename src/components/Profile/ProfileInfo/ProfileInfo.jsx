import React from 'react';
import s from './profileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import user from '../../../assets/image/user.jpg'


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                ProfileInfo
            </div>
            <div className={s.item}>
                <img src={props.profile.photos.large || user} className={s.photo} width={100} height={100}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/> }
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