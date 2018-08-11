'use strict';

const rover = require('./rover');

it('should return its initial position of: bottom left origin facing North', () => {
  const actual = rover.getPosition();
  const expected = [0, 0, 'N'];

  expect(expected).toEqual(actual);
});
