import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FilterType} from "../../redux/users-reducer";




const usersSearchFormValidate = () =>{
    const errors ={}
    return errors
}

type FormType ={
    term: string
    friend: 'true' | 'false' | 'null'
}
type PropsType ={
    onFilterChanged: (filter: FilterType) => void,
}

let UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
const filter: FilterType = {
    term: values.term,
    friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
}
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field name="term" type="text"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <ErrorMessage name="term"/>
                        <button type="submit" disabled={isSubmitting}>Find</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
})
export default UsersSearchForm