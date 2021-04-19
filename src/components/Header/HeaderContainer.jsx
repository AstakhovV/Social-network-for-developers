import React from 'react';
import Header from "./Header";
import * as axios from "axios";
import {setUserData} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true // подцепить куки
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    this.props.setUserData(id, email, login)
                }
            })
    }

    render() {


        return <Header {...this.props}/>
    }
}
const mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
)

export default connect (mapStateToProps,{setUserData}) (HeaderContainer);