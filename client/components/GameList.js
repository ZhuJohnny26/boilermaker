import React from 'react'
import { connect } from 'react-redux'
import {getGames} from '../redux/games'
import {logout, fetchMe} from '../redux/auth'
import {Redirect} from 'react-router-dom'

class GameList extends React.Component{
    componentDidMount(){
        this.props.fetchMe()
        this.props.getGames()
    }
    render(){     
        const {games, user, handleClick } = this.props    
        
        if (games[0]){
            if (!user.id){
            
                return <Redirect to="/"/>
            }
            return (
                <div>
                <h1>Welcome {user.email}</h1>
                <div className='m1'>
                <button type='button' onClick={handleClick} className='btn bg-blue white p1 rounded'>Logout</button>
                </div>
                <div>
                    {games.map(game => (
                        <div key={game.id}>
                            <h1>{game.name}</h1>
                            <img src={game.imageUrl} />
                            <p>{game.description}</p>
                            <button type="button">Play</button>
                        </div>
                    ))}
                </div>
                </div>
            )
        }
        else {
            return (<div>Loading</div>)
        } 
    }
}

const mapState = (state) => ({
    games: state.games,
    user: state.user
})

const mapDispatch = (dispatch, ownProps) => ({
    getGames: () => dispatch(getGames()),
    async handleClick () {
        const thunk = logout()
        await dispatch(thunk)
        ownProps.history.push('/')
      },
    fetchMe: () => dispatch(fetchMe())
})

export default connect(mapState, mapDispatch)(GameList)
