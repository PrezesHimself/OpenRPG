'use strict';

angular.module('chatApp')
.controller('SocketCtrl', function ($log, $scope, $rootScope, nickName, chatSocket,  messageFormatter) {
  $scope.nickName = 'nickName';
  $scope.usedNicks = [];
  var nickname = 'nickName';
  $scope.howManyDice = '1';
  $scope.dice = '10';
  console.log(chatSocket.send('test'));
  $scope.throwDice = function() {
    var dice = 0;
    var howManyDice = $scope.howManyDice
    var equasion = ''
    while(howManyDice--) {
      dice += Math.round(Math.random()*$scope.dice);
      equasion += ' + '+dice
    }
    equasion += ' = '+ '' + dice + ''
    chatSocket.send(messageFormatter(new Date(),nickName,'dice '+$scope.howManyDice+'k'+$scope.dice + "   " + equasion));
  }
  $scope.changeNick = function(name) {
    $scope.nickName = name;
    nickName = name;
  }
  $scope.sendMessage = function() {
    var match = $scope.message.match('^\/nick (.*)');

    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
      var oldNick = nickName;
      nickName = match[1];
      $scope.message = '';
      $scope.messageLog = messageFormatter(new Date(), 
                      nickName, 'nick changed - from ' + 
                        oldNick + ' to ' + nickName + '!') + $scope.messageLog;
      $scope.nickName = nickName;
      $scope.usedNicks = $scope.usedNicks.concat(nickName);
    }

    $log.debug('sending message', $scope.message);
    chatSocket.send(messageFormatter(new Date(),nickName, $scope.message) );
    $scope.message = '';
  };

  $rootScope.$on('myEvent', function(event, data) {
    // $log.debug('got a message', event.name);
    // $log.debug('got a message', data);
    // if (!data.payload) {
    //   $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
    //   return;
    // } 
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + data;
    });
  });
});
