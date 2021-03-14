import React from 'react';
import s from './MyPosts.module.css'
import Posts from "./Posts";

const MyPosts = (props) => {

    let postsElements =
        props.posts.map(p => <Posts message={p.message} likesCount={p.likesCount}/>)
    return (
        <div className={s.postsBlock}>
            <h2>My posts</h2>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add Post</button>
                </div>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;