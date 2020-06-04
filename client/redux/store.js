import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import gamesReducer from './games'
import authReducer from './auth'

const reducer = combineReducers({
    games: gamesReducer,
    user: authReducer
})

const store = createStore(reducer, applyMiddleware(createLogger(), thunkMiddleware))

export default store;
