'use strict';


const eventNames = [
  'GET_POSITION',
];


module.exports = eventNames.reduce((obj, item) => {
  obj[item] = item;
  return obj;
}, {});
