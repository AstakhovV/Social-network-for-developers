import usersReducer, {actions, InitialStateType} from "./users-reducer";
import {UsersType} from "../Types/CommonTypes";


let state: InitialStateType

beforeEach(() => {
    state= {
        users: [
            {
                id: 0, name: 'Vlad', followed: false,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'Vlad 2', followed: false,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 2, name: 'Vlad 3', followed: true,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 3, name: 'Vlad 4', followed: true,
                photos: {small: null, large: null}, status: 'status 0'
            },
        ] as Array<UsersType>,
        pageSize: 10 as number,
        totalUsersCount: 0 as number,
        currentPage: 1 as number,
        isFetching: false as boolean,
        followingInProgress: [] as Array<number>
    }
})

test('follow success', () => {

        const newState = usersReducer(state, actions.followSuccess(1));
        expect(newState.users[0].followed).toBeFalsy()
        expect(newState.users[1].followed).toBeTruthy()

    }
)
test('unfollow success', () => {

        const newState = usersReducer(state, actions.unfollowSuccess(3));
        expect(newState.users[3].followed).toBeFalsy()
        expect(newState.users[2].followed).toBeTruthy()

    }
)