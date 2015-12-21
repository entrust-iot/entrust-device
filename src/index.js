'use strict';

var agentApi = require('./agentapi');

agentApi.login('123')
  .then(function(loginResult) {
    console.log(loginResult);
    agentApi.send('temperature', { value: '123'});
  });
