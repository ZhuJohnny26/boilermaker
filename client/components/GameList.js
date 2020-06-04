import React from 'react'
import { connect } from 'react-redux'
import {getGames} from '../redux/games'
import {logout} from '../redux/auth'
import {Redirect} from 'react-router-dom'

class GameList extends React.Component{
    componentDidMount(){
        this.props.getGames()
    }
    render(){     
        const {games, user, handleClick } = this.props
        console.log(this.props)
        if (!user.email){
            return <Redirect to='/' />
        }
        if (games[0]){
            return (
                <div>
                <div className='m1'>
                <button type='button' onClick={handleClick} className='btn bg-blue white p1 rounded'>Logout</button>
                </div>
                <div>
                    {games.map(game => (
                        <div key={game.id}>
                            <h1>{game.name}</h1>
                            <img src={game.imageUrl} />
                            <p>{game.description}</p>
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
      }
})

export default connect(mapState, mapDispatch)(GameList)
