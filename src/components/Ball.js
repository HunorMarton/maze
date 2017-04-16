import React, {PropTypes} from 'react';
import {BALL_RADIUS} from '../constants/sizes';
import getMobileOperatingSystem from '../utils/operatingSystemDetection';

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

		if (canHandleMotion !== null && typeof(e.accelerationIncludingGravity.x) === "number") {
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
      let x,y;
      if(window.innerWidth < window.innerHeight) { // Portrait mode
        x = ax;
        y = ay;
      }else{ // Landscape mode
        x = -ay;
        y = ax;
      }
      switch(getMobileOperatingSystem()) {
        case "iOS":
          this.props.move(x,y);
          break;
        case "Android":
        this.props.move(-x,-y);
        break;
      }

		};
	}

  noMotionSupport() {
		/*
    // For debug purposes
    window.onmousemove = (e) => {
      const ax =  (e.clientX - window.innerWidth/2) / 30;
      const ay = -(e.clientY - window.innerHeight/2) / 30;
      this.props.move(ax,ay);
    };
    */
	}


  render() {
    return <circle className="ball" cx={this.props.x} cy={this.props.y} r={BALL_RADIUS}/>;
  }
}

Ball.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired
};

export default Ball;
