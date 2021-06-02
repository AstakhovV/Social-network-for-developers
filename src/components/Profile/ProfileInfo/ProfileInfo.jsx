import React, {useState} from 'react';
import s from './profileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import user from '../../../assets/image/user.jpg'
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({saveProfile,...props}) => {
    let [editMode, setEditMode] = useState(false);
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
    }


    return (
        <div>
            <div>
                ProfileInfo
            </div>
            <div className={s.item}>
                <img src={props.profile.photos.large || user} className={s.photo} width={100} height={100}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/> }
            </div>
            <div>

                <ProfileStatusWithHooks status={props.status}
                                        updateStatus={props.updateStatus}/>
            </div>
            { editMode
                ? <ProfileDataForm profile={props.profile}
                                   initialValues={props.profile}
                                   onSubmit={onSubmit}
                />
                : <ProfileData profile={props.profile}
                               isOwner={props.isOwner}
                               goToEditMode={() => {setEditMode(true)}}
                />}
        </div>
    )
}

const ProfileData = ({isOwner, goToEditMode, profile}) => {
    return <div>
        <div>
            <b>Name</b>: {profile.fullName}
        </div>
        {isOwner &&
            <div>
                <button onClick={goToEditMode}>Edit Profile Information</button>
            </div>
        }
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
        <div></div>
        <div></div>
    </div>


}


const Contact = ({contactTitle,contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: <b>{contactValue}</b></div>
}

export default ProfileInfo;