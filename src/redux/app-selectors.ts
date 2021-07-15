import {AppStateType} from "./redux-store";

export const selectorInitialized = (state: AppStateType) => {
    return state.app.initialized
}