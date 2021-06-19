import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {getCaptchaUrl, login} from "../../redux/auth-reducer";
import {creatorField, Element} from "../Common/Forms/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import s from "./Login.module.css"

const Input = Element('input')

const LoginForm = ({handleSubmit, error, captchaUrl}) => { //деструктуризация - прописывают нужные пропсы
    return (
        <div className={s.loginForm}>
            <form onSubmit={handleSubmit} >
                <div>
                    {creatorField('Email', 'email', [required], Input )}

                </div>
                <div>
                    {creatorField('Password', 'password', [required], Input, {type:"password"} )}

                </div>
                <div className={s.checkbox}>
                    {creatorField(null, 'rememberMe', [], Input, {type:"checkbox"}, 'Remember me' )}
                </div>
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && creatorField('Symbols from image', 'captcha', [], Input)}
                {captchaUrl && <button className={s.buttonUpdateCaptcha}>{getCaptchaUrl()}Update Captcha</button>}
                {error && <div className={s.formSummary}>
                    {error}
                </div>
                }
                <div className={s.buttonLogin}>
                    <button>Login</button>
                </div>
            </form>
        </div>

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