const roverController = require('./../../rover-controller');
const program = require('commander');


let grid = {
  height: 10,
  width: 10,
};


program
  .version('0.0.1')
  .option('-g, --grid <required>', 'grid (required)')
  .action(function (request) {
    console.log('.action() allows us to implement the command');
    console.log('User passed %s', JSON.stringify(request));
  });

program.parse(process.argv);
