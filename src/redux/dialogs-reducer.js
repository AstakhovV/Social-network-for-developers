const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


let initialState = {
    dialogs: [{id: 1, name: 'Tatyana'},
        {id: 2, name: 'Georgiy'},
        {id: 3, name: 'Alexander'},
        {id: 4, name: 'Elena'},
        {id: 5, name: 'Marina'},
        {id: 6, name: 'Viktor'}
    ],
    messages: [{id: 1, message: 'Hello!'},
        {id: 2, message: 'Can you show me your pets certificate?!'},
        {id: 3, message: 'Only your Collie'},
        {id: 4, message: 'She is pretty good'}
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {
// ... - спред оператор(оператор распространения), чтобы сделать поверхностную копию  объекта

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {...state,newMessageBody: action.body};
        case SEND_MESSAGE:
            let body = state.newMessageBody;

            return {...state,
                messages: [...state.messages, {id: 5, message: body}],
                newMessageBody: ''
            };
        default:
            return state;
    }
}
export default dialogsReducer;