'use strict';


const antenna_driver = require('./antenna-driver');


it('should receive messages', () => {
  expect(antenna_driver.receiveMessage('EVENT_NAME_THAT_DOESNT_EXIST')).toEqual(false);
  expect(antenna_driver.receiveMessage('GET_POSITION')).toEqual('GET_POSITION');
});
