import React, {PropTypes} from 'react';

const Wall = ({wall}) => (
  <line className="wall" x1={wall[0]} y1={wall[1]} x2={wall[2]} y2={wall[3]} />
);

Wall.propTypes = {
  wall: PropTypes.array.isRequired
};

export default Wall;
