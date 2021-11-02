import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts";
import {AddNewPostFormRedux, AddPostValuesType} from "./AddNewPostForm";
import {ProfileType} from "../../../Types/CommonTypes";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../../redux/profile-selectors";
import {actions} from "../../../redux/profile-reducer";

export type OwnPropsType = {
    isOwner: boolean
    profile: ProfileType
}
const MyPosts: React.FC<OwnPropsType> = (props) => {

    const posts = useSelector(getPosts)
    const dispatch = useDispatch()

    let postsElements = posts.map((p, i) => (
        <Posts key={`post-${p.id}-${i}`}
               message={p.message}
               likesCount={p.likesCount}
               profile={props.profile}/>
    ))

    let onAddPost = (values: AddPostValuesType) => {
        dispatch(actions.addPostActionCreator(values.newPostText));

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

export default MyPosts;