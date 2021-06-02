import React from "react";
import {creatorField, Element} from "../../Common/Forms/FormsControls";
import {reduxForm} from "redux-form";
import s from './profileInfo.module.css'

const Textarea = Element('textarea')
const Input = Element('input')

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save Profile Information
                </button>
            </div>
            {error && <div className={s.formSummary}>
                {error}
            </div>
            }
            <div>
                <b>Full name</b>: {creatorField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>:
                {creatorField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills</b>:
                {creatorField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me</b>:
                {creatorField('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}</b>: {creatorField(key, 'contacts.' + key, [], Input)}
                </div>
            })}
            </div>

        </form>
    )
}


const ProfileDataReduxForm = reduxForm({form: 'editProfile'}) (ProfileDataForm)
export default ProfileDataReduxForm
