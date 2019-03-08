const test = require('tape');
const domain = require('./index');


function makeGrid(width = 10, height = 10) {
  return {
    width: width,
    height: height,
  }
}


function makeRover(options = {}) {
  options.id = options.id || '1';
  options.orientation = options.orientation || 'N';
  options.x = options.x || 1;
  options.y = options.y || 1;

  return JSON.parse(JSON.stringify(options));
}


test('it should be able to rotate', function (t) {
  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'R')
    .then((result) => {
      t.equal(result.rover.orientation, 'E');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'RR')
    .then((result) => {
      t.equal(result.rover.orientation, 'S');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'RRR')
    .then((result) => {
      t.equal(result.rover.orientation, 'W');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'RRRR')
    .then((result) => {
      t.equal(result.rover.orientation, 'N');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'RRRRR')
    .then((result) => {
      t.equal(result.rover.orientation, 'E');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'L')
    .then((result) => {
      t.equal(result.rover.orientation, 'W');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'LL')
    .then((result) => {
      t.equal(result.rover.orientation, 'S');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'LLL')
    .then((result) => {
      t.equal(result.rover.orientation, 'E');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'LLLL')
    .then((result) => {
      t.equal(result.rover.orientation, 'N');
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover(),
    }, 'LLLLL')
    .then((result) => {
      t.equal(result.rover.orientation, 'W');
    });

  t.end();
});


test('it should be able to move', function (t) {
  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        orientation: 'E',
      }),
    }, 'MM')
    .then((result) => {
      t.equal(result.rover.x, 3);
      t.equal(result.rover.y, 1);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        orientation: 'S',
      }),
    }, 'MM')
    .then((result) => {
      t.equal(result.rover.x, 1);
      t.equal(result.rover.y, 3);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        orientation: 'W',
      }),
    }, 'MM')
    .then((result) => {
      t.equal(result.rover.x, 3);
      t.equal(result.rover.y, 1);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        y: 5,
        orientation: 'N',
      }),
    }, 'MM')
    .then((result) => {
      t.equal(result.rover.x, 1);
      t.equal(result.rover.y, 3);
    });

  t.end();
});


test('it should be able to handle movement and rotation commands in one instruction set', function (t) {
  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'N',
      }),
    }, 'MMRMMRMMLMM')
    .then((result) => {
      t.equal(result.rover.orientation, 'E');
      t.equal(result.rover.x, 9);
      t.equal(result.rover.y, 5);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'E',
      }),
    }, 'MMRMMRMMLMM')
    .then((result) => {
      t.equal(result.rover.orientation, 'S');
      t.equal(result.rover.x, 5);
      t.equal(result.rover.y, 9);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'S',
      }),
    }, 'MMRMMRMMLMM')
    .then((result) => {
      t.equal(result.rover.orientation, 'W');
      t.equal(result.rover.x, 1);
      t.equal(result.rover.y, 5);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'W',
      }),
    }, 'MMRMMRMMLMM')
    .then((result) => {
      t.equal(result.rover.orientation, 'N');
      t.equal(result.rover.x, 5);
      t.equal(result.rover.y, 1);
    });

  t.end();
});


test('it should handle instructions that are not recognised', function (t) {
  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'N',
      }),
    }, ' M[{M}]R MnN e MR55M-__/M#332L!~	M M')
    .then((result) => {
      t.equal(result.rover.orientation, 'E');
      t.equal(result.rover.x, 9);
      t.equal(result.rover.y, 5);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'N',
      }),
    }, 'mmrmmrmmlmm')
    .then((result) => {
      t.equal(result.rover.orientation, 'E');
      t.equal(result.rover.x, 9);
      t.equal(result.rover.y, 5);
    });

  t.end();
});


test('it should stop at the edges of the grid', function (t) {
  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'N',
      }),
    }, 'MMMMMM')
    .then((result) => {
      t.equal(result.rover.y, 1);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'E',
      }),
    }, 'MMMMMM')
    .then((result) => {
      t.equal(result.rover.x, 10);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'W',
      }),
    }, 'MMMMMM')
    .then((result) => {
      t.equal(result.rover.x, 1);
    });

  domain.instructRover({
      grid: makeGrid(),
      rover: makeRover({
        x: 5,
        y: 5,
        orientation: 'S',
      }),
    }, 'MMMMMM')
    .then((result) => {
      t.equal(result.rover.y, 10);
    });

  t.end();
});