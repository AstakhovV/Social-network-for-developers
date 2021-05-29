import React from "react";
import style from './users.module.css';
import userPhoto from '/REACT/Social-network-for-developers/src/assets/image/user.jpg'
import {NavLink} from "react-router-dom";

let Users = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
         <span>
             <div>
                 <NavLink to={'/profile/' + user.id}>
                  <img src={user.photos.small != null ? user.photos.small : userPhoto} className={style.userPhoto}/>
                 </NavLink>
             </div>
             <div>
                 {user.followed //хоть одна айди равна айди пользователя, тогда откл.кнопку
                     ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                         unfollow(user.id)
                     }}> Unfollow </button>
                     : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                         follow(user.id)
                     }}> Follow </button>}
             </div>
         </span>
            <span>
                 <div>{user.name}</div>
                 <div>{user.status}</div>
             </span>
        </div>
    )
}
export default Users