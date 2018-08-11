'use strict';


const location_driver = require('./location-driver');


it('should receive messages', () => {
  expect(location_driver.getPosition()).toEqual([0, 0, 'N']);
});
