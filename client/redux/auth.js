import axios from 'axios'

const GET_USER = 'GET_USER'
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';

const getUser = (user) => (
    {
        type: GET_USER,
        user
    }
)

const setFetchingStatus = isFetching  => ({
    type: SET_FETCHING_STATUS,
    isFetching
  })

export const fetchMe = () => {
    return async dispatch => {
      dispatch(setFetchingStatus(true))
      try {
        const response = await axios.get('/auth/me')
        dispatch(getUser(response.data))
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(setFetchingStatus(false))
      }
    }
  }

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.put('/auth/login', credentials)
            dispatch(getUser(data))
            return true
        } catch (err){
            console.log('Error in Login redux', err)
            return false
        }
    }
}

export const signUp = (credentials) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.post('/auth/signup', credentials)
            dispatch(getUser(data))
        } catch (err){
            console.log('Error in Login redux', err)
        }
    }
}

export const logout = () => {
    return async dispatch => {
      try {
        await axios.delete('/auth/logout')
        dispatch(getUser({}))
      } catch (error) {
        console.error(error)
      }
    }
  }
  

const authReducer = (state = {}, action) => {
    switch (action.type){
        case GET_USER:
            return action.user
        case SET_FETCHING_STATUS:
            return {
                ...state,
                user: {
                ...state.user,
                isFetching: action.isFetching
                }
        }
        default:
            return state
    }
}
export default authReducer
