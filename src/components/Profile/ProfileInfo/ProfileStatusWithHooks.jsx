import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {
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
    const onStatusChange = (e) => {
        if (e.currentTarget.value.length <= 200) { //ограничитель ввода
            setStatus(e.currentTarget.value)}}

        return (
            <div>
                {!editMode &&
                <div>
                    <b>Status</b>: <span onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
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