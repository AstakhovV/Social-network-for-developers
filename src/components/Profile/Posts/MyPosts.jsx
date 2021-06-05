import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Element} from "../../Common/Forms/FormsControls";

const Textarea = Element('textarea')

const maxLength100 = maxLengthCreator(100)

const MyPosts = (props) => {
    debugger

    let postsElements =
        props.posts.map(p => <Posts key={p.id}
                                    message={p.message}
                                    likesCount={p.likesCount}
                                    profile={props.profile}
                                    isOwner={props.isOwner}
        />)


    let onAddPost = (values) => {
        props.addPost(values.newPostText);

    }
    return (
        <div className={s.postsBlock}>
            {props.isOwner && <h2>My posts</h2>}
            {props.isOwner && <AddNewPostFormRedux onSubmit={onAddPost}/>}
            {props.isOwner && <div className={s.posts}>
                {postsElements}
            </div>}
        </div>

    )
}

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea}
                       placeholder='Enter your new post' validate={[required,maxLength100]}/>
            </div>
            <div>
                <button className={s.button}>Add Post</button>
            </div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm ({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)

export default MyPosts;