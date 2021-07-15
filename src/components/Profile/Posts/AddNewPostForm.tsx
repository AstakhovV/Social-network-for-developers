import {InjectedFormProps, reduxForm} from "redux-form";
import {creatorField, Textarea} from "../../Common/Forms/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import s from "./MyPosts.module.css";
import React from "react";
import { Button } from "antd";

type PropsType = {
}

export type AddPostValuesType = {
    newPostText: string
}
type PostFormValuesTypeKeys = Extract<keyof AddPostValuesType, string>

const maxLength100 = maxLengthCreator(100)

export const AddNewPostForm: React.FC<InjectedFormProps<AddPostValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {creatorField<PostFormValuesTypeKeys>('Enter your new post', 'newPostText', [required, maxLength100], Textarea )}
            </div>
            <div style={{marginTop: '10px'}}>
                <Button onClick={props.handleSubmit} className={s.button}>Add Post</Button>
            </div>
        </form>
    )
}
export const AddNewPostFormRedux = reduxForm<AddPostValuesType, PropsType> ({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)
