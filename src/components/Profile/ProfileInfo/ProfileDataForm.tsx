import React from "react";
import {creatorField, Textarea, Input} from "../../Common/Forms/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './profileInfo.module.css'
import {ProfileType} from "../../../Types/CommonTypes";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = Extract<keyof ProfileType, string>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit} className={s.profileData}>
            <div>
                <button className={s.button}>Save Profile Information
                </button>
            </div>
            {error && <div className={s.formSummary}>
                {error}
            </div>
            }
            <div>
                <b>Full name</b>: {creatorField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>:
                {creatorField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills</b>:
                {creatorField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me</b>:
                {creatorField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    // todo: create some solution
                    <b>{key}</b>: {creatorField(key, 'contacts.' + key, [], Input)}
                </div>
            })}
            </div>
            <hr/>

        </form>
    )
}


const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: 'editProfile'}) (ProfileDataForm)
export default ProfileDataReduxForm
