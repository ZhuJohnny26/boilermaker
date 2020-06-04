import React from 'react'
import { connect } from 'react-redux'
import {getGames} from '../redux/games'


class GameList extends React.Component{
    componentDidMount(){
        this.props.getGames()
    }
    render(){
        
        const games = this.props.games
        console.log("GameList -> render -> games", games)
        if (games[0]){
            console.log('inside here')
            return (
                <div>
                    {games.map(game => (
                        <div key={game.id}>
                            <h1>{game.name}</h1>
                            <img src={game.imageUrl} />
                            <p>{game.description}</p>
                        </div>
                    ))}
                </div>
            )
        }
        else {
            return (<div>Loading</div>)
        }     
    }
}

const mapState = (state) => ({
    games: state.games
})

const mapDispatch = (dispatch) => ({
    getGames: () => dispatch(getGames())
})

export default connect(mapState, mapDispatch)(GameList)
