import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";
import {WitSuspenseHock} from "./hoc/WithSuspenseHock";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {
    catchAllUnhandleErrors = (reason, promiseRejectionEvent) => {
        alert('Some error occured')
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
                               render={WitSuspenseHock(DialogsContainer)}/>
                        <Route path='/profile/:userId?' // : - параметры
                               render={WitSuspenseHock(ProfileContainer)}/>
                        <Route path='/users'
                               render={() => <UsersContainer store={this.props.store}/>}/>
                        <Route path='/login'
                               render={() => <LoginPage store={this.props.store}/>}/>
                        <Route path='/*'
                               render={() => <div>Page not found</div>}/>
                        <Redirect exact from="/" to="/profile" />
                    </div>

                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    (connect(mapStateToProps, {initializeApp})))(App);

//BrowserRouter basename={process.env.PUBLIC_URL} - для deploy

const MainApp = (props) => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default MainApp;