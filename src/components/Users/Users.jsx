import React from "react";
import style from './users.module.css';
import userPhoto from '/REACT/Animal breeder/src/assets/image/user.jpeg'

let Users = (props) => { //this нет в функц.компонентах

    let pagesCount = Math.ceil(
        props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    } // pagination - постраничный вывод

    return<div>
        <div>
            {pages.map(p => { // выделение активной страницы
                return <span className={props.currentPage === p && style.selectedPage}
                             onClick={(e) => {props.onPageChanged(p) }}>{p}</span>
            })}

        </div>
        {
            props.users.map(u => <div key={u.id}>
         <span>
             <div>
                 <img src={u.photos.small != null ? u.photos.small : userPhoto} className={style.userPhoto}/>
             </div>
             <div>
                 {u.followed
                     ? <button onClick={() => {
                         props.unfollow(u.id)
                     }}> Unfollow </button>
                     : <button onClick={() => {
                         props.follow(u.id)
                     }}> Follow </button>}

             </div>
         </span>
                <span>
             <span>
                 <div>{u.name}</div>
                 <div> My dogs:
                     {/*<div>{u.pets.dogs.dog1}</div>*/}
                     {/*<div>{u.pets.dogs.dog2}</div>*/}
                     {/*<div>{u.pets.dogs.dog3}</div>*/}
                 </div>
                 <div> My cats:
                     {/*<div>{u.pets.cats.cat1}</div>*/}
                     {/*<div>{u.pets.cats.cat2}</div>*/}
                     {/*<div>{u.pets.cats.cat3}</div>*/}
                 </div>
             </span>
             <span>
                 {/*<div>{u.location.country}</div>*/}
                 {/*<div>{u.location.city}</div>*/}
                 <div></div>
             </span>
         </span>

            </div>)
        }
    </div>
}
export default Users