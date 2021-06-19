import React from "react";
import s from './FormsControls.module.css'
import {required} from "../../../utils/validators/validators";
import {Field} from "redux-form";

//HOC
export const Element = Element => ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <Element {...input} {...props} />
            {hasError && <span> {error} </span>}
        </div>
    );
};

export const creatorField = (placeholder, name, validate, component, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               validate={validate}
               {...props}
        />{text}
    </div>
)
