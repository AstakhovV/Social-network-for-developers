import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import HeaderIcon from '../../assets/image/HeaderIcon.png'

const Header = (props) => {
    return <header className={s.header}>
        <img src={HeaderIcon} />
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log Out</button></div>
                : <NavLink to={'/login'}><button>Login</button></NavLink>}

        </div>
    </header>
}

export default Header;