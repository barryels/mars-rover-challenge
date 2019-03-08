'use strict';


const express = require('express');
const bodyParser = require('body-parser')
const app = express();


function setupRoutes(app, config, domain) {
  // console.log('setupRoutes()', config);
  app.get(config.basePath + '/', (req, res) => {
    res.send('');
  });

  app.get(config.basePath + '/get-rover-list', (req, res) => {
    res.send([]);
  });

  app.post(config.basePath + '/get-rover-state', (req, res) => {
    // console.log('req.body', req.body.id);
    const roverID = req.body.id || null;

    if (!roverID) {
      res.send({});
      return;
    }

    res.send({
      id: roverID,
      position: domain.getRoverPosition(),
    });
  });

  app.post(config.basePath + '/update-rover-position', (req, res) => {
    res.send({
      message: 'RECEIVED',
      position: [],
    });
  });

}


function start(server, app, config, domain) {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());

  setupRoutes(app, config, domain);

  return server;
};


module.exports = function (app, config, domain) {
  const server = app.listen(config.port, () => {
    // console.log('Inbound HTTP API listening on port ' + config.port + '!');
  });

  return {
    start: start.bind(null, server, app, config, domain),
  };
}.bind(null, app);
