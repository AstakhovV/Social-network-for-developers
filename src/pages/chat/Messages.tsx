import React, {useEffect, useState} from 'react';
import { ChatMessageType } from '../../api/chat.api';
import Message from './Message';

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const createMessage = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages(prevState => [...prevState, ...newMessages])
        }
        wsChannel?.addEventListener('message', createMessage)
        return () => {
            wsChannel?.removeEventListener('message', createMessage)
        }
    }, [wsChannel])

    return (
        <div style={{height: '400px', overflowY: "auto"}}>
            {messages.map((message: any, index: number) => (
                <Message key={index} message={message}/>
            ))}
        </div>
    );
};

export default Messages;

