import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts";

const MyPosts = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
                <button>Add Post</button>
            </div>
            <div>
                New post
            </div>
            <Posts message='Hi, how are you?'/>
            <Posts message='I have two purebreed pets'/>
            <Posts/>
            <Posts/>
            <Posts/>
        </div>
    )
}

export default MyPosts;