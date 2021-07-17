import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./profileInfo.module.css";
import {Input} from "antd";

type PropsType = {
    status: string
    updateStatus: (status: string)=> void
    isOwner: boolean

}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        props.isOwner &&
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        props.isOwner &&
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement> )=> {
        if (e.currentTarget.value.length <= 200) { //ограничитель ввода
            setStatus(e.currentTarget.value)}}

        return (
            <div className={s.profileData}>
                {!editMode &&
                <div className={s.userStatus} onClick={activateEditMode}>
                    <b>Status</b>: <span >{props.status || "No status"} </span>
                </div>
                }
                {editMode && props.isOwner &&
                <div>
                    <Input onChange={onStatusChange}
                           autoFocus={true}
                           onBlur={deactivateEditMode}
                           value={status}
                    />
                </div>
                }
            </div>
        )
}

export default ProfileStatusWithHooks;