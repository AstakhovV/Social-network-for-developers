import React from 'react';
import {ChatMessageAPIType} from '../../api/chat.api';

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return (
        <div>
            <img style={{width: '30px', borderRadius: '50%'}} src={message.photo} alt=""/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    );
});

export default Message;


