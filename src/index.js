/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Maze from './containers/Maze';
import {move} from './actions/ballActions';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss';

const store = configureStore();

// Initial actions...
store.dispatch(move(10, 10));


render(
  <AppContainer>
    <Maze store={store} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Maze', () => {
    const NewMaze = require('./containers/Maze').default;
    render(
      <AppContainer>
        <NewMaze store={store} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
