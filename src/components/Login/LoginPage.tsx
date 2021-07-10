import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
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
            <form onSubmit={handleSubmit}>
                <div>
                    {creatorField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}

                </div>
                <div>
                    {creatorField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: "password"})}

                </div>
                <div className={s.checkbox}>
                    {creatorField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type: "checkbox"}, 'Remember me')}
                </div>
                {captchaUrl && <img src={captchaUrl} alt={captchaUrl}/>}
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)


export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>


export const LoginPage: React.FC = (props) => {
    const captchaUrl: string | null = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth: boolean = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha)
        )
    }
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}
                        captchaUrl={captchaUrl}
        />
    </div>
}