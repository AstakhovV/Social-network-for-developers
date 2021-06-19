import React, {useState} from 'react';
import s from './profileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import user from '../../../assets/image/user.jpg'
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({saveProfile,...props}) => {
    let [editMode, setEditMode] = useState(false);
    const hiddenFileInput = React.useRef(null)

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

    const handleClick = event => {
        hiddenFileInput.current.click()
    }

    return (
        <div>
            <div className={s.profileTitle}>
                ProfileInfo
            </div>
            <div className={s.item}>
                <img class="main photo" src={props.profile.photos.large || user} className={s.photo} width={100} height={100}/>
                <div>
                    <button className={s.button} onClick={handleClick}>Upload image</button>
                </div>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} style={{display:'none'}} ref={hiddenFileInput}/> }
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
    return <div className={s.profileData}>
        <div>
            <b>Name</b>: {profile.fullName}
        </div>
        {isOwner &&
            <div>
                <button className={s.button} onClick={goToEditMode}>Edit Profile Information</button>
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
        <hr/>

    </div>


}


const Contact = ({contactTitle,contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: <b>{contactValue}</b></div>
}

export default ProfileInfo;