import React from 'react';
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Row} from "antd";
import {GithubOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";
import {UserOutlined} from '@ant-design/icons';

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
            <Col span={1}>
                <a href='https://github.com/AstakhovV' target="_blank">{<GithubOutlined/>}</a>
            </Col>
            <Col span={17}>
                <p style={{color: "white"}}> Social Network for Web Developers</p>
            </Col>
            {isAuth
                ? <>
                    <Col span={2}>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Col>
                    <Col span={2}>
                        <p style={{color: "white"}}>{login}</p>
                    </Col>
                    <Col span={2}>
                        <Button onClick={logoutCallback}>Log Out</Button>
                    </Col>
                </>
                :
                <Col span={5}>
                    <Button>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </Col>
            }
        </Row>
    </Header>
}
