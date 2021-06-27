import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./profileInfo.module.css";

type PropsType = {
    status: string
    updateStatus: (status: string)=> void
}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement> )=> {
        if (e.currentTarget.value.length <= 200) { //ограничитель ввода
            setStatus(e.currentTarget.value)}}

        return (
            <div className={s.profileData}>
                {!editMode &&
                <div className={s.userStatus}>
                    <b>Status</b>: <span onClick={activateEditMode}>{props.status || "No status"} </span>
                </div>
                }
                {editMode &&
                <div>
                    <input onChange={onStatusChange}
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