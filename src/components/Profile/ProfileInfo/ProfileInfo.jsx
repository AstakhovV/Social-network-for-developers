import React from 'react';
import s from '../Profile.module.css'

const ProfileInfo = (props) => {

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
                <img src={props.profile.photos.large} width={100} height={100}/>
                <div>
                    Name:
                    {props.profile.fullName}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;