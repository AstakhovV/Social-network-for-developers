import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import HeaderIcon from '../../assets/image/HeaderIcon.png'

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}
const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return <header className={s.header}>
        <img src={HeaderIcon}/>
        <span className={s.mainText}>
            Social Network for Web Developers
            </span>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button className={s.logButton} onClick={props.logout}>Log Out</button></div>
                : <NavLink to={'/login'}><button className={s.logButton}>Login</button></NavLink>}

        </div>
    </header>
}

export default Header;