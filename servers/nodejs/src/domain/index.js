'use strict';

const db = require('./../../db/db.js');

const roverObserver = require('./rover-observer/rover-observer')(db);
const rover = require('./rover/rover');


// Use cases




module.exports = {
  getRoverPosition: roverObserver.getRoverPosition,
};
