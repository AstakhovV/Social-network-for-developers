import React, {ComponentType} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {LoginPage} from "./components/Login/LoginPage";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {WithSuspenseHock} from "./hoc/WithSuspenseHock";
import {UsersPage} from './components/Users/UsersContainer';
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {HeaderApp} from './components/Header/Header';
import { Footer } from 'antd/lib/layout/layout';


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = WithSuspenseHock(DialogsContainer)
const SuspendedProfile = WithSuspenseHock(ProfileContainer)

class App extends React.Component <MapPropsType  & DispatchPropsType> {
    catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred')
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandleErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Layout>
                <HeaderApp/>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            //defaultSelectedKeys={['1']}
                            //defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                                <Menu.Item key="1"><Link to="/profile">Profile </Link>
                                </Menu.Item>
                                <Menu.Item key="2"><Link to="/dialogs">Dialogs</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                <Menu.Item key="5"><Link to="/developers">All Users</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Settings">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
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
                                       render={() => <UsersPage/>}/>
                                <Route path='/login'
                                       render={() => <LoginPage/>}/>
                                <Route path='*'
                                       render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>AstakhovV</Footer>
            </Layout>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
    withRouter,
    (connect(mapStateToProps, {initializeApp})))(App);


const MainApp: React.FC = () => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default MainApp;