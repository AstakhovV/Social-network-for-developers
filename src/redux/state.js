import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let store = {
    _state: {
        profilePage: {
            posts: [{id: 1, message: 'Hi, how are you?', likesCount: 23},
                {id: 2, message: 'I have two purebreed pets', likesCount: 2}],
            newPostText: 'Text here ... '
        },
        dialogsPage: {
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
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed')
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; // 'наблюдатель' паттерн observer
    },
    // action - объект у которого есть typ
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state); //уведомление подписчика (store)
    }
}
//Экш креатор для создания действия в UI
    export const addPostActionCreator = () => ({type: ADD_POST});
    export const updateNewPostTextActionCreator = (text) =>
        ({type: UPDATE_NEW_POST_TEXT, newText: text});
    export const sendMessageCreator = () => ({type: SEND_MESSAGE});
    export const updateNewMessageBodyCreator = (body) => {
        return {
            type: UPDATE_NEW_MESSAGE_BODY, body: body
        }
    }





    window.store = store;
    export default store

