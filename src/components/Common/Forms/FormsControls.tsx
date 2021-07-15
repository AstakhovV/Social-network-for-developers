import React from "react";
import s from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";
import TextArea from "antd/lib/input/TextArea";
import {Input} from "antd";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><TextArea placeholder="Autosize height based on content lines" autoSize {...input} {...restProps}/>
       </FormControl>
}

export const InputReduxForm: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><Input {...input} {...restProps} /></FormControl>
}

export function creatorField<FormKeysType  extends string> (placeholder: string | undefined,
                             name: FormKeysType,
                             validate: Array<FieldValidatorType>,
                             component: React.FC<WrappedFieldProps>,
                             props = {}, text = '') {
    return <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               validate={validate}
               {...props}
        />{text}
    </div>
}
