import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Element} from "../../Common/Forms/FormsControls";

const Textarea = Element('textarea')

const maxLength10 = maxLengthCreator(10)

const MyPosts = (props) => {
    let postsElements =
        props.posts.map(p => <Posts message={p.message} likesCount={p.likesCount}/>)


    let onAddPost = (values) => {
        props.addPost(values.newPostText);

    }
    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea}
                       placeholder='Enter your new post' validate={[required,maxLength10]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm ({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)

export default MyPosts;