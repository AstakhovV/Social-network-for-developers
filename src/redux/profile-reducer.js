const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [{id: 1, message: 'Hi, how are you?', likesCount: 23},
        {id: 2, message: 'I have two purebreed pets', likesCount: 2}],
    newPostText: ''
};

const profileReducer = (state  = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            state.posts.push(newPost); //пуш поста в стейт
            state.newPostText = '';  //обнуление текста в поле пост
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}
    export default profileReducer;