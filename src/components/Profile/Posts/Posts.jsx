import React from 'react';
import s from './Posts.module.css'

const Posts = (props) => {
    return (
        <div>
            <div className={s.post}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVvEr3Mh_jR4XT1dopVAH8uvexHpMXxxYnA&usqp=CAU'/>
                {props.message}
                <div>
                    <span>Like</span>
                </div>
            </div>
        </div>
    )
}

export default Posts;