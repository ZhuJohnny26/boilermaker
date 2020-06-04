import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import gamesReducer from './games'

const reducer = combineReducers({
    games: gamesReducer
})

const store = createStore(reducer, applyMiddleware(createLogger(), thunkMiddleware))

export default store;
