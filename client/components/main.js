import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux'
import store from '../redux/store'
import GameList from './GameList'
import '../../public/index.css'
import LocalLoginForm from  './LocalLogin'
import {Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom'
import {fetchMe} from '../redux/auth'

class Main extends React.Component{
  componentDidMount(){
    this.props.fetchMe()
  }
  render(){
    if (this.props.userCurrentlyBeingFetched){
      return (
        <div>Loading</div>
      )
    }
    return (
      <Switch>
      <Route path="/home" component={GameList} />
      <Route component={LocalLoginForm} />
      </Switch>
    )
  }
}

const mapState = (state) => (
  {
    user: state.user
  }
)

const mapDispatch = (dispatch) => (
  {
    fetchMe: () => dispatch(fetchMe())
  }
)

const WrappedMain = connect(mapState, mapDispatch)(Main)

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <WrappedMain />
    </Router>
  {/* <LocalLoginForm /> */}
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
