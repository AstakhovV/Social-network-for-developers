import {maxLengthCreator, required} from "../../utils/validators/validators";
import {creatorField, Textarea} from "../Common/Forms/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {NewMessageFormValuesType} from "./Dialogs";
import { Button } from "antd";
import s from "../Login/Login.module.css";

export const maxLength50 = maxLengthCreator(50)
type PropsType = {}

type NewMessageValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>

const AddMessagesForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.loginForm}>
                {creatorField<NewMessageValuesTypeKeys>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea )}
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button onClick={props.handleSubmit}>Send Message</Button>
            </div>
        </form>
    )
}
export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType> ({form: 'dialogsMessageForm'}) (AddMessagesForm)

