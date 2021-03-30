import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/store";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {
    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }
    let onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action);
    }
    return (<MyPosts updateNewPostText={onPostChange}
                     addPost={addPost} // 2 колбэка
                     posts={state.profilePage.posts}
                     newPostText={state.profilePage.newPostText}/>) // данные для контейнерной компоненты
}

export default MyPostsContainer;