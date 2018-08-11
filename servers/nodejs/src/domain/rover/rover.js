'use strict';


const events = require('./events/events');
const antenna_driver = require('./antenna-driver/antenna-driver');


module.exports = {
  getPosition: function () { return [0, 0, 'N']; },
  // getPosition: antenna_driver.receiveMessage.bind(null, events.GET_POSITION),
};
