import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Link, Redirect, Route, Switch, useLocation, withRouter} from "react-router-dom";
import {LoginPage} from "./components/Login/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {WithSuspenseHock} from "./hoc/WithSuspenseHock";
import {UsersContainer} from './components/Users/UsersContainer';
import {Breadcrumb, Layout, Menu, Modal} from 'antd';
import {TeamOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {HeaderApp} from './components/Header/Header';
import {selectorInitialized} from "./redux/app-selectors";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ChatPageContainer = React.lazy(() => import('./pages/chat/ChatPage'));

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const SuspendedDialogs = WithSuspenseHock(DialogsContainer)
const SuspendedProfile = WithSuspenseHock(ProfileContainer)
const SuspendedChatPage = WithSuspenseHock(ChatPageContainer)

type AppPropsType = {
}

const App: React.FC<AppPropsType> = () => {

    const initialized = useSelector(selectorInitialized)
    const dispatch = useDispatch()
    const location = useLocation()
    const breadCrumbView = () => {
        const { pathname } = location
        return pathname.split('/').filter(item => item)[0]
    }
    let pathnameURL = breadCrumbView ()
    let pathnameCrumb = ''
    if (pathnameURL){
        pathnameCrumb = pathnameURL[0].toUpperCase() + pathnameURL.slice(1)
    }


    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        return  Modal.error({
            title: 'This is an error message',
            content: 'Some error occurred',
        });

    }
    useEffect(() => {
        dispatch(initializeApp())
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
        }
    }, [])

    return (
        (!initialized) ?
            <Preloader/> :
            <Layout>
                <HeaderApp/>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            //defaultSelectedKeys={['1']}
                            //defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                <Menu.Item key="1"><Link to="/profile">Profile </Link>
                                </Menu.Item>
                                <Menu.Item key="2"><Link to="/dialogs">Dialogs</Link>
                                </Menu.Item>
                                <Menu.Item key="3"><Link to="/chat">Chat</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Users">
                                <Menu.Item key="4"><Link to="/developers">Developers</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
                                <Menu.Item key="5"><Link to="/settings">Main settings</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item><Link to="/profile">Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={`/${pathnameURL}`} >{pathnameCrumb}</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route exact path='/'
                                       render={() => <Redirect to={"/profile"}/>}/>
                                <Route path='/dialogs'
                                       render={() => <SuspendedDialogs/>}/>
                                <Route path='/profile/:userId?'
                                       render={() => <SuspendedProfile/>}/>
                                <Route path='/developers'
                                       render={() => <UsersContainer/>}/>
                                <Route path='/login'
                                       render={() => <LoginPage/>}/>
                                <Route path='/chat'
                                       render={() => <SuspendedChatPage/>}/>
                                <Route path='*'
                                       render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
    )
}
export const AppContainer = withRouter(App)