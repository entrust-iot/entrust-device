'use strict';

function agentApi() {
  var self = this,
      http = require('http'),
      Q = require('q'),
      REST_URL = '127.0.0.1',
      REST_PORT = '8080';

  self.login = login;
  self.send = send;

  function login(apiKey) {
    var q = Q.defer();

    http.get('http://' + REST_URL + ':' + REST_PORT + '/login/' + apiKey, function(res) {
      res.on('data', function (chunk) {
        q.resolve(chunk.toString('ascii'));
      });
    });

    return q.promise;
  };

  function send(name, value) {
    console.log('send ', name, ' with', value);

    var options = {
      hostname: REST_URL,
      port: REST_PORT, 
      path: '/api/' + name,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var req = http.request(options);
    req.write(JSON.stringify(value));
    req.end();
  };
};

module.exports = new agentApi();

