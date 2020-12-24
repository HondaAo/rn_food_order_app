import { combineReducers } from 'redux'
import { ShoppingReducer } from './shoppingReducer'
import { UserReducer } from './useReducer'

const rootReducer = combineReducers({
    userReducer: UserReducer,
    shoppingReducer: ShoppingReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export { rootReducer }