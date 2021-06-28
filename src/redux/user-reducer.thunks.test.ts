import {actions, follow, unfollow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock("../api/users-api")

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.unfollow.mockClear()
    userAPIMock.follow.mockClear()
})


const result: APIResponseType ={
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}


test('Follow thunk should be success', async ()=>{

    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)

    await thunk(dispatchMock,getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingProgress(false, 1))
})

test('UnFollow thunk should be success', async ()=>{

    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1)

    await thunk(dispatchMock,getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingProgress(false, 1))
})