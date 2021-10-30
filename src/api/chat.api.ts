let subscribers = [] as SubscriberType[]

let ws: WebSocket
const closeHandler = () => {
    console.log('Close WS')
    setTimeout(createChannel, 5000)
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    // @ts-ignore
    subscribers.forEach(s => s(newMessages))
}


export const chatAPI = {
    start() {
        createChannel()
    },
    stop(){
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()

    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}

export type SubscriberType ={
    messages: ChatMessageType[]
}

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}