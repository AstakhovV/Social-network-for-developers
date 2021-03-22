import React from 'react';
import s from './Profile.module.css'
import MyPosts from "./Posts/MyPosts";

const Profile = (props) => {

    return (
        <div>
            <div>
                <img src='https://pcvector.net/uploads/posts/2018-08/1533326959_low-poly-background-generator-min.png'
                     width={500}/>
            </div>
            <div>
                ProfileInfo
            </div>
            <div className={s.item}>
                My profile
            </div>
            <div>
                My pets
            </div>
            <div>
                <MyPosts posts={props.state.posts}
                         dispatch={props.dispatch}
                         newPostText={props.state.newPostText}
                />
            </div>
        </div>
    )
    debugger;
}

export default Profile;