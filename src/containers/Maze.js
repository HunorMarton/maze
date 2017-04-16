import React from 'react';
import PropTypes from 'prop-types';
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/ballActions';
import Canvas from '../components/Canvas';
import DeviceNotSupported from '../components/DeviceNotSupported';
import getMobileOperatingSystem from '../utils/operatingSystemDetection';

class Maze extends React.Component {
  constructor(props, context) {
    super(props, context);

    if(getMobileOperatingSystem() === "iOS" || getMobileOperatingSystem() === "Android" ) {
      this.deviceSupported = true;
    }
  }

  render() {
    let content = <Canvas x={this.props.x} y={this.props.y} move={this.props.actions.move}/>;
    if(this.deviceSupported !== true) {
      content = <DeviceNotSupported />;
    }
    return (
      <Provider store={this.props.store}>
        <div id="container">
          {content}
        </div>
      </Provider>
    );
  }
}

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
