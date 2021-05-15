import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://www.1zoom.me/big2/42/194904-Soverein.jpg'/>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log Out</button></div>
                : <NavLink to={'/login'}><button>Login</button></NavLink>}

        </div>
    </header>
}

export default Header;