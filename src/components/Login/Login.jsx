import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {creatorField, Element} from "../Common/Forms/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import s from "../Common/Forms/FormsControls.module.css"

const Input = Element('input')

const LoginForm = ({handleSubmit, error}) => { //деструктуризация - прописывают нужные пропсы
    return (
        <form onSubmit={handleSubmit}>
            {creatorField('Email', 'email', [required], Input )}
            {creatorField('Password', 'password', [required], Input, {type:"password"} )}
            {creatorField(null, 'rememberMe', [], Input, {type:"checkbox"}, 'remember me' )}
            {error && <div className={s.formSummary}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm ({form: 'login'}) (LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)}
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})



export default connect(mapStateToProps,{login})(Login);