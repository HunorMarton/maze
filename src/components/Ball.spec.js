// Must have at least one test file in this directory or Mocha will throw an error.
import React from 'react';
import {shallow} from 'enzyme';
import Ball from './Ball';

describe('<Ball />', () => {

  it('should have a circle with \'ball\' class', () => {
    const wrapper = shallow(<Ball x={0} y={0} />);
    const actual = wrapper.find('circle').prop('className');
    const expected = 'ball';

    expect(actual).toEqual(expected);
  });
});
