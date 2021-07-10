import React, {ComponentType, Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import { LoginPage } from "./components/Login/LoginPage";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {WithSuspenseHock} from "./hoc/WithSuspenseHock";
import { UsersPage } from './components/Users/UsersContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

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
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs'
                               render={ () => <SuspendedDialogs/>}/>
                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfile/>}/>
                        <Route path='/users'
                               render={() => <UsersPage />}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Redirect exact from="/" to="/profile" />
                    </div>

                </div>
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