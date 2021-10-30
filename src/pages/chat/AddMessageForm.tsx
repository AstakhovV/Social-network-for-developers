import React, {useEffect, useState} from 'react';

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [isClosed, setIsClosed] = useState(true)
    useEffect(() => {
        const openWebSocket = () => {
            setIsClosed(false)
        }
        wsChannel?.addEventListener('open', openWebSocket)
        return () => {
            wsChannel?.removeEventListener('open', openWebSocket)
        }
    }, [wsChannel])
    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <div>
                <button disabled={isClosed || wsChannel === null} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default AddMessageForm;