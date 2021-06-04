import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {getCaptchaUrl, login} from "../../redux/auth-reducer";
import {creatorField, Element} from "../Common/Forms/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import s from "../Common/Forms/FormsControls.module.css"

const Input = Element('input')

const LoginForm = ({handleSubmit, error, captchaUrl}) => { //деструктуризация - прописывают нужные пропсы
    return (
        <form onSubmit={handleSubmit}>
            {creatorField('Email', 'email', [required], Input )}
            {creatorField('Password', 'password', [required], Input, {type:"password"} )}
            {creatorField(null, 'rememberMe', [], Input, {type:"checkbox"}, 'remember me' )}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && creatorField('Symbols from image', 'captcha', [], Input)}
            {captchaUrl && <button>{getCaptchaUrl()}Update Captcha</button>}
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
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)}
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}
                        captchaUrl={props.captchaUrl}
        />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})



export default connect(mapStateToProps,{login, getCaptchaUrl})(Login);