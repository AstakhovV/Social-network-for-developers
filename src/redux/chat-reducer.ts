import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chat.api";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as ChatMessageType[]
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages} } as const)
}
const chatReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED':
            return {...state,
                messages: [...state.messages, ...action.payload.messages],
            };
        default:
            return state;
    }
}
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    // @ts-ignore
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    // @ts-ignore
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessages = (message:string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default chatReducer;