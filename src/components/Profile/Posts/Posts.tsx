import React from 'react';
import s from './Posts.module.css'
import myPostIcon from '../../../assets/image/myPostIcon.png'
import {ProfileType} from "../../../Types/CommonTypes";
import {LikeOutlined} from '@ant-design/icons';


type PropsType = {
    message: string,
    likesCount: number
    profile: ProfileType
}
const Posts: React.FC<PropsType> = (props) => {
    return (
            <div className={s.post}>
                <img src={props.profile.photos.large || myPostIcon}/>
                {props.message}
                <div>
                    <LikeOutlined />
                     Like {props.likesCount}
                </div>
            </div>
    )
}

export default Posts;