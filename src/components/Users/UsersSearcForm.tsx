import React from "react";
import {ErrorMessage, Field, Formik} from "formik";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";
import {Input, Select, SubmitButton, Form} from "formik-antd";
import s from './users.module.css'
import {Button} from "antd";



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
                        <Input className={s.userSearchForm} name="term" type="text"/>
                        <Select className={s.userSearchFormSelect} name="friend">
                            <option value="null">All</option>
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>
                        </Select>
                        <ErrorMessage name="term"/>
                        <SubmitButton style={{marginLeft:'2px'}} disabled={isSubmitting}>Find</SubmitButton>
                    </Form>
                )}
            </Formik>

        </div>
    )
})
export default UsersSearchForm