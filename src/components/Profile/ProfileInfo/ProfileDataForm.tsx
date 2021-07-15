import React from "react";
import {creatorField, Textarea, InputReduxForm} from "../../Common/Forms/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './profileInfo.module.css'
import {ProfileType} from "../../../Types/CommonTypes";
import { Button } from "antd";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = Extract<keyof ProfileType, string>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit} className={s.profileData}>

            {error && <div className={s.formSummary}>
                {error}
            </div>
            }
            <div>
                <b>Full name</b>: {creatorField<ProfileTypeKeys>('Full name', 'fullName', [], InputReduxForm)}
            </div>
            <div>
                <b>Looking for a job</b>:
                {creatorField<ProfileTypeKeys>('', 'lookingForAJob', [], InputReduxForm, {type: 'checkbox'})}
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
                    <b>{key}</b>: {creatorField(key, 'contacts.' + key, [], InputReduxForm)}
                </div>
            })}
            </div>
            <hr/>
            <div>
                <Button onClick={handleSubmit} className={s.buttonSaveProfile}>Save Profile Information
                </Button>
            </div>

        </form>
    )
}


const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: 'editProfile'}) (ProfileDataForm)
export default ProfileDataReduxForm
