'use strict';

const express = require('express');
const app = express();


function setupRoutes(app, config, domain) {
  app.get(config.basePath + '/', (req, res) => {
    res.send('')
  });

  app.get(config.basePath + '/rover', (req, res) => {
    res.send({
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
  setupRoutes(app, config, domain);
  return server;
};


module.exports = function (app, config, domain) {
  const server = app.listen(config.port, () => {
    console.log('Inbound HTTP API listening on port ' + config.port + '!');
  });

  return {
    start: start.bind(null, server, app, config, domain),
  };
}.bind(null, app);
