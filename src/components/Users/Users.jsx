import React from "react";
import style from './users.module.css';
import userPhoto from '/REACT/Animal breeder/src/assets/image/user.jpeg'
import {NavLink} from "react-router-dom";

let Users = (props) => { //this нет в функц.компонентах

    let pagesCount = Math.ceil(
        props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    } // pagination - постраничный вывод

    return <div>
        <div>
            {pages.map(p => { // выделение активной страницы
                return <span className={props.currentPage === p && style.selectedPage}
                             onClick={(e) => {props.onPageChanged(p)}}>{p}</span>})}

        </div>
        {
            props.users.map(u => <div key={u.id}>
         <span>
             <div>
                 <NavLink to={'/profile/' + u.id}>
                  <img src={u.photos.small != null ? u.photos.small : userPhoto} className={style.userPhoto}/>
                 </NavLink>
             </div>
             <div>
                 {u.followed //хоть одна айди равна айди пользователя, тогда откл.кнопку
                     ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                         props.unfollow(u.id)
                     }}> Unfollow </button>
                     : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                         props.follow(u.id)
                     }}> Follow </button>}

             </div>
         </span>
                <span>
             <span>
                 <div>{u.name}</div>
             </span>
         </span>

            </div>)
        }
    </div>
}
export default Users