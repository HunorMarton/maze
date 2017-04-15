import React, {PropTypes} from 'react';
import * as ball from '../constants/ball';

class Ball extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.checkForMotionSupport = this.checkForMotionSupport.bind(this);
    this.hasMotionSupport = this.hasMotionSupport.bind(this);
    this.noMotionSupport = this.noMotionSupport.bind(this);
  }

  componentDidMount() {
    window.addEventListener("devicemotion", this.checkForMotionSupport, false);
  }

  checkForMotionSupport(e) {
		const canHandleMotion = e; // Will be either null or have event data

		if (canHandleMotion !== null) {
			this.hasMotionSupport();
		} else {
			this.noMotionSupport();
		}

		window.removeEventListener("devicemotion", this.checkForMotionSupport, false);
	}

  hasMotionSupport() {
		window.ondevicemotion = (e) => {
      const ax = e.accelerationIncludingGravity.x;
      const ay = e.accelerationIncludingGravity.y;
      this.props.move(ax,ay);
		};
	}

  noMotionSupport() {

	}

  render() {
    return <circle className="ball" cx={this.props.x} cy={this.props.y} r={ball.SIZE}/>;
  }
}

Ball.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired
};

export default Ball;
