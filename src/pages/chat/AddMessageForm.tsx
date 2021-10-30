import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {sendMessages} from "../../redux/chat-reducer";

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const [isClosed, setIsClosed] = useState(true)
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessages(message))
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};

export default AddMessageForm;