import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {creatorField, InputReduxForm} from "../Common/Forms/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import s from "./Login.module.css"
import {AppStateType} from "../../redux/redux-store";
import {Button, Col, Divider, Row, Tooltip} from "antd";


type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => { //деструктуризация - прописывают нужные пропсы

    function CopyToClipboard(id: string) {
        let r = document.createRange();
        // @ts-ignore
        r.selectNode(document.getElementById(id));
        // @ts-ignore
        window.getSelection().removeAllRanges();
        // @ts-ignore
        window.getSelection().addRange(r);
        document.execCommand('copy');
        // @ts-ignore
        window.getSelection().removeAllRanges();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Row >
                    <Col>
                        <div className={s.loginForm}>
                            {creatorField<LoginFormValuesTypeKeys>('Email', 'email', [required], InputReduxForm)}
                        </div>
                        <div className={s.loginForm}>
                            {creatorField<LoginFormValuesTypeKeys>('Password', 'password', [required], InputReduxForm, {type: "password"})}

                        </div>
                        <div className={s.loginFormCaptcha}>
                            {captchaUrl && <img src={captchaUrl} alt={captchaUrl}/>}
                        </div>
                        <div className={s.loginFormCaptcha}>
                            {captchaUrl && creatorField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [], InputReduxForm)}
                        </div>
                        {error && <div className={s.formSummary}>
                            {error}
                        </div>
                        }
                        <Row>
                            <Col>
                                <div className={s.checkbox}>
                                    {creatorField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], InputReduxForm, {type: "checkbox"}, 'Remember me')}
                                </div>
                            </Col>
                            <Col>
                                <div className={s.buttonLogin}>
                                    <Button onClick={handleSubmit}>Login</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Tooltip id='email' title="astakh_clever@mail.ru" color='blue' key='blue'>
                            <Button onClick={()=>CopyToClipboard('email')}>Copy test email</Button>
                        </Tooltip>
                    </Col>
                    <Col>
                        <Tooltip id='password' title="asdfgh123" color='blue' key='blue'>
                            <Button onClick={()=>CopyToClipboard('password')}>Copy test password</Button>
                        </Tooltip>
                    </Col>
                </Row>


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
        <Divider orientation="left">Login</Divider>
        <LoginReduxForm onSubmit={onSubmit}
                        captchaUrl={captchaUrl}
        />
    </div>
}