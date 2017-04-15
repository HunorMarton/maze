import React from 'react';
import PropTypes from 'prop-types';
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/ballActions';
import Canvas from '../components/Canvas';

const Maze = (props) => {
  return (
    <Provider store={props.store}>
      <Canvas x={props.x} y={props.y} move={props.actions.move}/>
    </Provider>
  );
};

Maze.propTypes = {
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    x: state.ball.x,
    y: state.ball.y
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Maze);
