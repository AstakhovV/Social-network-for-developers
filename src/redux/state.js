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
                {id: 6, name: 'Viktor'}],
            messages: [{id: 1, message: 'Hello!'},
                {id: 2, message: 'Can you show me your pets certificate?!'},
                {id: 3, message: 'Only your Collie'},
                {id: 4, message: 'She is pretty good'},]
        }
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
    dispatch (action) {
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';  //обнуление текста в поле пост
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}


window.store = store;


export default store

