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
    ]
}

const dialogsReducer = (state = initialState, action) => {
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
export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody });


export default dialogsReducer;