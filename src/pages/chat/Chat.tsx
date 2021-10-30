import React, {useEffect} from 'react';
import AddMessageForm from './AddMessageForm';
import Messages from "./Messages";
import {useDispatch} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";

const Chat: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    );
};

export default Chat;
