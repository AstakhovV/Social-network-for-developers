import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status )
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <div>
                <button disabled={status !== "ready"} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};

export default AddMessageForm;