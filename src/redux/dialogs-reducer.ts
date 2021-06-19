const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number,
    name: string
}
type MessagesType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [{id: 1, name: 'Tatyana'},
        {id: 2, name: 'Georgiy'},
        {id: 3, name: 'Alexander'},
        {id: 4, name: 'Elena'},
        {id: 5, name: 'Marina'},
        {id: 6, name: 'Viktor'}
    ] as Array<DialogType>,
    messages: [{id: 1, message: 'Hello!'},
        {id: 2, message: 'I will take you on a job'},
        {id: 3, message: 'Do you agree with that?'},
        {id: 4, message: 'Okey'}
    ] as Array<MessagesType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any):InitialStateType => {
// ... - спред оператор(оператор распространения), чтобы сделать поверхностную копию  объекта

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {...state,
                messages: [...state.messages, {id: 5, message: body}],
            };
        default:
            return state;
    }
}

type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody });


export default dialogsReducer;