import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
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
                               render={() => <DialogsContainer store={this.props.store}/>}/>
                        <Route path='/profile/:userId?' // : - параметры
                               render={() => <ProfileContainer store={this.props.store}/>}/>
                        <Route path='/users'
                               render={() => <UsersContainer store={this.props.store}/>}/>
                        <Route path='/login'
                               render={() => <LoginPage store={this.props.store}/>}/>
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

const MainApp = (props) => {
 return <BrowserRouter>
     <Provider store={store}>
         <AppContainer/>
     </Provider>
 </BrowserRouter>
}
export default MainApp;