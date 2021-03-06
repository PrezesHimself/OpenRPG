'use strict';
angular.module('chatApp')
  .factory('chatSocket', ['$rootScope','$websocket', function($rootScope, $websocket) {
      // Open a WebSocket connection
      // var dataStream = $websocket(location.origin.replace(/^http/, 'ws'));
var ws = $websocket(location.origin.replace(/^http/, 'ws'));
  var collection = [];

  ws.onMessage(function(event) {
    console.log('message: ', event.data);
    var res;
    try {
      res = JSON.parse(event.data);
    } catch(e) {
      res = {'username': 'anonymous', 'message': event.data};
    }
    $rootScope.$emit("myEvent", event.data);
  });

  ws.onError(function(event) {
    console.log('connection Error', event);
  });

  ws.onClose(function(event) {
    console.log('connection closed', event);
  });

  ws.onOpen(function() {
    console.log('connection open');
    ws.send('Hello World');
    ws.send('again');
    ws.send('and again');
  });
  // setTimeout(function() {
  //   ws.close();
  // }, 500)

  return {
    collection: collection,
    status: function() {
      return ws.readyState;
    },
    send: function(message) {
      if (angular.isString(message)) {
        ws.send(message);
      }
      else if (angular.isObject(message)) {
        ws.send(JSON.stringify(message));
      }
    }

  };
    }])


