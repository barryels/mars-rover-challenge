'use strict';


const request = require('request');


const CONFIG = {
  port: 3000, // Math.floor(Math.random() * 999) + 3000,
  basePath: '/api/v1',
};


function getFullyQualifiedRequestPath(partialPath) {
  return 'http://lvh.me:' + CONFIG.port + CONFIG.basePath + partialPath;
}

function _test() {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}


describe('inboundApiAdaptorHttp', () => {
  let inboundApiAdaptorHttp;

  beforeEach(() => {
    inboundApiAdaptorHttp = require('./inbound-api-adaptor-http')(CONFIG, {
      getRoverPosition: function () {
        return [1, 1, 'S'];
      },
    }).start();
  });


  afterEach(() => {
    inboundApiAdaptorHttp.close();
  });


  test('it should respond to the base route', (done) => {
    request(getFullyQualifiedRequestPath('/'), (error, response, body) => {
      expect(body).toBe('');
      done();
    })
  });


  test('it should return a list of active rovers', (done) => {
    request(getFullyQualifiedRequestPath('/get-rover-list'), (error, response, body) => {
      expect(body).toBe(JSON.stringify([]));
      done();
    });
  });


  test('it should return the rover\'s current state', (done) => {
    request({
      uri: getFullyQualifiedRequestPath('/get-rover-state'),
      method: 'POST',
      json: {
        id: 'asdf-1234',
      },
    }, (error, response, body) => {
      expect(JSON.stringify(body)).toBe(JSON.stringify({
        id: 'asdf-1234',
        position: [1, 1, 'S'],
      }));
      done();
    });
  });


  test('it should respond to a rover command request', (done) => {
    request({
      uri: getFullyQualifiedRequestPath('/update-rover-position'),
      method: 'POST',
      json: {
        message: 'MRR',
      },
    }, (error, response, body) => {
      expect(body.message).toEqual('RECEIVED');
      expect(body.position).toBeDefined();
      done();
    });
  });

});
