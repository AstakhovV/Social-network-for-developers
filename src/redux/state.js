import {rerenderEntireTree} from "../render";

let state = {
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
}
window.state = state;

export let addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = ''  //обнуление текста в поле пост
    rerenderEntireTree(state);
};

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
};

export default state