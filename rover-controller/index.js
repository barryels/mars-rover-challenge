const INSTRUCTION_VALUES = ['R', 'L', 'M'];
const ORIENTATION_VALUES = ['N', 'E', 'S', 'W'];
const ORIENTATION_INCREMENT = 90;


function isGridValid(grid) {
  if (!grid) {
    return false;
  }

  if (!grid.width) {
    return false;
  }

  if (!grid.height) {
    return false;
  }

  if (parseInt(grid.width, 10) < 2 || parseInt(grid.height, 10) < 2) {
    return false;
  }

  return true;
}


function cleanInstructions(instructions) {
  return instructions
    .split('')
    .map((instruction) => {
      return instruction.toUpperCase();
    })
    .filter((instruction) => {
      return INSTRUCTION_VALUES.indexOf(instruction) > -1;
    });
}


function orientationToRotation(orientation) {
  let result = 0;
  ORIENTATION_VALUES.forEach((value, index) => {
    if (value === orientation) {
      result = ORIENTATION_INCREMENT * index;
    }
  });

  return result;
}


function rotationToOrientation(rotation) {
  let result = 0;

  ORIENTATION_VALUES.forEach((value, index) => {
    if (rotation === ORIENTATION_INCREMENT * index) {
      result = value;
    }
  });

  return result;
}


function getOrientationAfterRotation(orientation, rotation) {
  const currentRotation = orientationToRotation(orientation);
  let rotationValue = 0;
  let result = 0;

  if (rotation === 'R') {
    rotationValue = ORIENTATION_INCREMENT;
  } else {
    rotationValue = -ORIENTATION_INCREMENT;
  }

  result = currentRotation + rotationValue;

  if (result === 360) {
    result = 0;
  }

  if (result < 0) {
    result += 360;
  }

  return rotationToOrientation(result);
}


/**
 * 
 * @param {Object} state 
 * @param {Object} state.rover
 * @param {String} state.rover.id
 * @param {String} state.rover.orientation
 * @param {Number} state.rover.x
 * @param {Number} state.rover.y
 * @param {String} instructions 
 */
function instructRover(state, instructions) {
  let errors = [];
  let roverClone = JSON.parse(JSON.stringify(state.rover));

  if (!isGridValid(state.grid)) {
    errors.push('Invalid grid');
  }

  const instructionSet = cleanInstructions(instructions);

  instructionSet.forEach((instruction) => {
    const roverRotation = orientationToRotation(roverClone.orientation);
    let newPosition = {
      x: roverClone.x,
      y: roverClone.y,
    };

    switch (instruction) {
      case 'R':
        roverClone.orientation = getOrientationAfterRotation(roverClone.orientation, instruction);
        break;
      case 'L':
        roverClone.orientation = getOrientationAfterRotation(roverClone.orientation, instruction);
        break;
      default:
        switch (roverRotation) {
          case 0:
            newPosition.y -= 1;
            break;
          case 90:
            newPosition.x += 1;
            break;
          case 180:
            newPosition.y += 1;
            break;
          case 270:
            newPosition.x -= 1;
            break;
        }
        break;
    }

    if (newPosition.x > state.grid.width) {
      newPosition.x = state.grid.width;
    }

    if (newPosition.y > state.grid.height) {
      newPosition.y = state.grid.height;
    }

    if (newPosition.x < 1) {
      newPosition.x = 1;
    }

    if (newPosition.y < 1) {
      newPosition.y = 1;
    }

    roverClone.x = newPosition.x;
    roverClone.y = newPosition.y;
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