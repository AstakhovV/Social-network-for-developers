import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts";
import {AddNewPostFormRedux, AddPostValuesType} from "./AddNewPostForm";
import {PostType, ProfileType} from "../../../Types/CommonTypes";

export type MapPropsType = {
    posts: Array<PostType>

}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
export type OwnPropsType = {
    isOwner: boolean
    profile: ProfileType
}
const MyPosts: React.FC<MapPropsType & DispatchPropsType & OwnPropsType> = (props) => {
    let postsElements =
        props.posts.map(p => <Posts key={p.id}
                                    message={p.message}
                                    likesCount={p.likesCount}
                                    profile={props.profile}

        />)


    let onAddPost = (values: AddPostValuesType) => {
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

export default MyPosts;