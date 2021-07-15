import {ContactsType, ProfileType} from "../../../Types/CommonTypes";
import React from "react";
import s from "./profileInfo.module.css";
import {Contact} from "./ProfileContact";

type ProfileDaraPropsType = {
    isOwner: boolean,
    goToEditMode: () => void,
    profile: ProfileType
}

export const ProfileData: React.FC<ProfileDaraPropsType> = ({isOwner, goToEditMode, profile}) => {

    return (
        <>
            <div className={s.profileData}>
                <div>
                    <b>Name</b>: {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job</b>: {profile.lookingForAJob ? "Yes" : "No"}
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
                    return <Contact key={key} contactTitle={key}
                                    contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
                </div>
            </div>
        </>
    )
}
