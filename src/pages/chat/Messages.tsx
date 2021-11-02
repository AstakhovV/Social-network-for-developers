import React, {useEffect, useRef, useState} from 'react';
import Message from './Message';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const Messages: React.FC = () => {
    const messages = useSelector((state:AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>)=>{
        let element = e.currentTarget
        if (Math.abs((element.scrollHeight -element.scrollTop) - element.clientHeight) < 200){
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({block: 'end', behavior: "smooth"})
        }
    }, [messages])
    return (
        <div style={{height: '400px', overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map((message: any) => (
                <Message key={message.id} message={message}/>
            ))}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
};

export default Messages;

