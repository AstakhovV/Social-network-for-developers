import React from 'react';
import s from './Posts.module.css'
import myPostIcon from '../../../assets/image/myPostIcon.png'

const Posts = (props) => {
    return (
        <div>
            <div className={s.post}>
                <img src={props.profile.photos.large || myPostIcon}/>
                {props.message}
                <div>
                    <span>Like</span> {props.likesCount}
                </div>
            </div>
        </div>
    )
}

export default Posts;