import React, {useEffect} from 'react';
import AddMessageForm from './AddMessageForm';
import Messages from "./Messages";
import {useDispatch, useSelector} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

const Chat: React.FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Some error occurred. Please, refresh page.</div>}
            <Messages/>
            <AddMessageForm/>
        </div>
    );
};

export default Chat;
