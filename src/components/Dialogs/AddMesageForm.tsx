import {maxLengthCreator, required} from "../../utils/validators/validators";
import {creatorField, Textarea} from "../Common/Forms/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {NewMessageFormValuesType} from "./Dialogs";

export const maxLength50 = maxLengthCreator(50)
type PropsType = {}

type NewMessageValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>

const AddMessagesForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {creatorField<NewMessageValuesTypeKeys>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea )}
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}
export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType> ({form: 'dialogsMessageForm'}) (AddMessagesForm)

