const ORIENTATION_VALUES = ['N', 'E', 'S', 'W'];
const ORIENTATIONS = {
  N: {
    x: 0,
    y: -1
  },
  E: {
    x: 1,
    y: 0
  },
  S: {
    x: 0,
    y: 1
  },
  W: {
    x: -1,
    y: 0
  },
};


function loopAroundList(values, index) {
  if (index > -1 && index < values.length) {
    return values[index];
  }
  if (index < 0) {
    return values[values.length + index];
  }
  if (index > values.length - 1) {
    return values[index - values.length];
  }
}


function limitToOne(value) {
  return value < 1 ? 1 : value;
}


function limitToBounds(boundary, current, increment) {
  position = limitToOne(current + increment);

  if (position > boundary) {
    return boundary;
  }

  return position;
}


/**
 * 
 * @param {Object} state 
 * @param {Object} state.grid
 * @param {Number} state.grid.height
 * @param {Number} state.grid.width
 * @param {Object} state.rover
 * @param {String} state.rover.orientation
 * @param {Number} state.rover.x
 * @param {Number} state.rover.y
 * @param {String} instructions
 */
function instructRover(state, instructions) {
  let roverClone = JSON.parse(JSON.stringify(state.rover));
  const instructionSet = instructions.split('');

  instructionSet.forEach((instruction) => {
    if (instruction === 'R') {
      roverClone.orientation = loopAroundList(ORIENTATION_VALUES, ORIENTATION_VALUES.indexOf(roverClone.orientation) + 1);
    }

    if (instruction === 'L') {
      roverClone.orientation = loopAroundList(ORIENTATION_VALUES, ORIENTATION_VALUES.indexOf(roverClone.orientation) - 1);
    }

    if (instruction === 'M') {
      roverClone.x = limitToBounds(state.grid.width, roverClone.x, ORIENTATIONS[roverClone.orientation].x);
      roverClone.y = limitToBounds(state.grid.height, roverClone.y, ORIENTATIONS[roverClone.orientation].y);
    }
  });

  return new Promise((resolve) => {
    resolve({
      grid: state.grid,
      rover: roverClone,
      instructionSet: instructionSet,
      instructions: instructions,
    });
  });
}


module.exports = {
  instructRover,
};