import axios from 'axios'

const GET_GAMES = 'GET_GAMES'

const setGames = (games) => ({
    type: GET_GAMES,
    games
})

export const getGames = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('/api/games')
            dispatch(setGames(data))
        } catch (err){
            console.log('Error in redux fetch games', err)
        }
    }
}

const gamesReducer = (state = [], action) => {
    switch (action.type){
        case GET_GAMES:
            return action.games
        default:
            return state
    }
}
export default gamesReducer
