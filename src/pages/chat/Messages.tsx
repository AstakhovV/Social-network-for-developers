import React from 'react';
import Message from './Message';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const Messages: React.FC = () => {
    const messages = useSelector((state:AppStateType) => state.chat.messages)

    return (
        <div style={{height: '400px', overflowY: "auto"}}>
            {messages.map((message: any, index: number) => (
                <Message key={index} message={message}/>
            ))}
        </div>
    );
};

export default Messages;

