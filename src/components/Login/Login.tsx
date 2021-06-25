import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {getCaptchaUrl, login} from "../../redux/auth-reducer";
import {creatorField, Input} from "../Common/Forms/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import s from "./Login.module.css"
import {AppStateType} from "../../redux/redux-store";


type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => { //деструктуризация - прописывают нужные пропсы
    return (
        <div className={s.loginForm}>
            <form onSubmit={handleSubmit} >
                <div>
                    {creatorField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input )}

                </div>
                <div>
                    {creatorField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type:"password"} )}

                </div>
                <div className={s.checkbox}>
                    {creatorField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type:"checkbox"}, 'Remember me' )}
                </div>
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && creatorField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [], Input)}
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps> ({form: 'login'}) (LoginForm)

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>


const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: any) => {
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

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})



export default connect(mapStateToProps,{login, getCaptchaUrl})(Login);