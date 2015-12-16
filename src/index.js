'use strict';

var agentApi = require('./agentapi');

agentApi.login('my key')
  .then(function(loginResult) {
    console.log(loginResult);
    agentApi.send('temperature', { value: '123'});
  });
