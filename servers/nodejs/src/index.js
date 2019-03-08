'use strict';


const inboundApiAdaptorHttp = require('./inbound-api-adaptor-http/inbound-api-adaptor-http');
const domain = require('./domain');


inboundApiAdaptorHttp(
  {
    port: 9001,
    basePath: '/api/v1',
  },
  domain
).start();
