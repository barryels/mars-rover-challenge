'use strict';


const events = require('./../events/events');


function receiveMessage(eventName) {
  switch (eventName) {
    case events.GET_POSITION:
      return eventName;

    default:
      return false;
  }
}

module.exports = {
  receiveMessage: receiveMessage,
};
