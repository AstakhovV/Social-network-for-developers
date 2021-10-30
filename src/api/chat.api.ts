const subscribers = [] as SubscriberType[]

export const chatAPI = {
    subscribe(callback: (messages: SubscriberType) => void){
        subscribers.push(callback)
    }
}

type SubscriberType ={
    messages: ChatMessageType[]
}

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}