'use strict';


const domain = require('./domain');

require('./inbound-api-adaptor-http/inbound-api-adaptor-http')({
  port: 9001,
  basePath: '/api/v1',
}, domain);
