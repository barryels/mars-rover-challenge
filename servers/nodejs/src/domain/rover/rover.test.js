'use strict';

const rover = require('./rover');


describe('', () => {

  test('initial position should be bottom left origin facing North', function () {
    const actual = rover.getPosition();
    const expected = [0, 0, 'N'];

    expect(expected).toEqual(actual);
  });

});
