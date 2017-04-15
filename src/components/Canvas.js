import React from 'react';
import PropTypes from 'prop-types';

class Canvas extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ax: 0,
      ay: 0
    };

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
      const ax = e.accelerationIncludingGravity.x * 5;
      const ay = e.accelerationIncludingGravity.y * 5;
      this.setState({
        ax: Math.round(ax),
        ay: Math.round(ay)
      });
      this.props.move(ax,ay);
		};
	}

  noMotionSupport() {

	}

  render() {


    return (
      <div>
        <div>
          ax: {this.state.ax}
        </div>
        <div>
          ay: {this.state.ay}
        </div>

        <svg width="200" height="200">
          <circle className="ball" cx={this.props.x} cy={this.props.y} r="20"/>
        </svg>
      </div>
    );
  }
}

Canvas.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  debug: PropTypes.string.isRequired,
  move: PropTypes.func.isRequired
};

export default Canvas;
