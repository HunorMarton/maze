import React from 'react';
import PropTypes from 'prop-types';
import walls from '../data/walls';
import Ball from './Ball';
import Wall from './Wall';

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
      <div id="container">
        <div>
          <div>
            ax: {this.state.ax}
          </div>
          <div>
            ay: {this.state.ay}
          </div>
        </div>
        <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {walls.map(wall => <Wall key={wall} data={wall} />)}
          <Ball x={this.props.x} y={this.props.y} />
        </svg>
      </div>
    );
  }
}

Canvas.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired
};

export default Canvas;
