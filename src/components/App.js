import React from 'react';
import Maze from '../containers/Maze';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div id="appContainer">
        <Maze />
      </div>
    );
  }
}

export default App;
