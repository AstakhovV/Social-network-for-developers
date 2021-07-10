import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";




const usersSearchFormValidate = () =>{
    const errors ={}
    return errors
}

type FriendFormType = 'true' | 'false' | 'null';
type FormType ={
    term: string
    friend: FriendFormType
}
type PropsType ={
    onFilterChanged: (filter: FilterType) => void,
}

let UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter: FilterType = useSelector(getUsersFilter)


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
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
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