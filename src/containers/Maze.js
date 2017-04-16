import React from 'react';
import PropTypes from 'prop-types';
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/ballActions';
import Canvas from '../components/Canvas';
import DeviceNotSupported from '../components/messages/DeviceNotSupported';
import GyroscopeNotFound from '../components/messages/GyroscopeNotFound';
import getMobileOperatingSystem from '../utils/operatingSystemDetection';

class Maze extends React.Component {
  constructor(props, context) {
    super(props, context);

    if(getMobileOperatingSystem() === "iOS" || getMobileOperatingSystem() === "Android" ) {
      this.deviceSupported = true;

      this.state = {
        motionSupport: false, // By default let's assume it's not working,
      };

      this.checkForMotionSupport = this.checkForMotionSupport.bind(this);
    }
  }

  componentDidMount() {
    window.addEventListener("devicemotion", this.checkForMotionSupport, false);
  }

  checkForMotionSupport(e) {
		const canHandleMotion = e;

		if (canHandleMotion !== null && typeof(e.accelerationIncludingGravity.x) === "number") {
      this.setState({motionSupport: true});
		}

		window.removeEventListener("devicemotion", this.checkForMotionSupport, false);
	}


  render() {
    let content;
    if(this.deviceSupported !== true) {
      content = <DeviceNotSupported />;
    }else if(this.state.motionSupport !== true) {
      content = <GyroscopeNotFound />;
    }else{
      content = <Canvas x={this.props.x} y={this.props.y} move={this.props.actions.move}/>;
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
