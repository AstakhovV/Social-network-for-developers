import React from 'react';
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {GithubOutlined, UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";

const { Header } = Layout;


export const HeaderApp: React.FC = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)

    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }

    return <Header className="header">
        <Row>
            <Col span={17}>
                <a href='https://github.com/AstakhovV' target="_blank">{<GithubOutlined/>}</a>
            </Col>
            {isAuth
                ? <>
                    <Col span={4}>
                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Col>
                    <Col span={2}>
                        <Button onClick={logoutCallback}>Log Out</Button>
                    </Col>
                </>
                :
                <Col span={6}>
                    <Button>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </Col>
            }
        </Row>
    </Header>

}


/*
<header className={s.header}>
    <img src={HeaderIcon}/>
    <span className={s.mainText}>
            Social Network for Web Developers
            </span>
    <div className={s.loginBlock}>
        {props.isAuth
            ? <div>{props.login} - <button className={s.logButton} onClick={props.logout}>Log Out</button></div>
            : <NavLink to={'/login'}><button className={s.logButton}>Login</button></NavLink>}

    </div>
</header>*/
