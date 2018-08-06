'use strict';


const request = require('request');


const CONFIG = {
  port: 3000, // Math.floor(Math.random() * 999) + 3000,
  basePath: '/api/v1',
};


function getFullyQualifiedRequestPath(partialPath) {
  return 'http://lvh.me:' + CONFIG.port + CONFIG.basePath + partialPath;
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


  test('it should return the rover data', (done) => {
    request(getFullyQualifiedRequestPath('/rover'), (error, response, body) => {
      expect(body).toBe(JSON.stringify({
        position: [1, 1, 'S'],
      }));
      done();
    })
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
