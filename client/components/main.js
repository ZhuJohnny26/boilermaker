import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '../redux/store'
import GameList from './GameList'

ReactDOM.render(
  <Provider store={store}>
  <GameList />
  <div>testytesy</div>
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
