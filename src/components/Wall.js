import React, {PropTypes} from 'react';

const Wall = ({data}) => (
  <line className="wall" x1={data[0]} y1={data[1]} x2={data[2]} y2={data[3]} />
);

Wall.propTypes = {
  data: PropTypes.array.isRequired
};

export default Wall;
