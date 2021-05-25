import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let action = addPostActionCreator('NewMessage');
let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 23},
        {id: 2, message: 'It is my first project', likesCount: 122}
    ]
}

test('length of posts should be incremented', () => {

    // 2.action
    let newState = profileReducer(state,action);
    // 3.expectation
    expect(newState.posts.length).toBe(3)
});

test('message should be correct', () => {

    // 2.action
    let newState = profileReducer(state,action);
    // 3.expectation
    expect(newState.posts[2].message).toBe('NewMessage')
});

test('length of messages should be decremented', () => {
    let action = deletePost(1)
    // 2.action
    let newState = profileReducer(state, action);
    // 3.expectation
    expect(newState.posts.length).toBe(1)
});

test('length of messages should not be decremented if id not correct', () => {
    let action = deletePost(1000)
    // 2.action
    let newState = profileReducer(state, action);
    // 3.expectation
    expect(newState.posts.length).toBe(2)
});
