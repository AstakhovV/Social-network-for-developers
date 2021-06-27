import {InferActionsTypes} from "./redux-store";

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

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({type: 'dialogs/SEND-MESSAGE', newMessageBody } as const)

}
const dialogsReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'dialogs/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {...state,
                messages: [...state.messages, {id: 5, message: body}],
            };
        default:
            return state;
    }
}

type DialogType = {
    id: number,
    name: string
}
type MessagesType = {
    id: number,
    message: string
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default dialogsReducer;