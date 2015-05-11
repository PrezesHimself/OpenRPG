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
  var shuffle = function (o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  };
  $scope.generateDemonicNickname = function() {
    var newName = "",
        words = 0,
        maxWords = 8,
        sylabes = ["dah","'ni","vahha","rouk","kresh","fus"];

    do {
      words++;
      newName+=Math.round(Math.random()*10) > 4 ? shuffle(sylabes)[0] : " ";
    } while (Math.round(Math.random()*10) && words < maxWords)

    $scope.changeNick(newName);
  }
  $scope.generateNickname = function() {
    var newName;

    var prefix = [ 'podejrzanie', 'bardzo', 'wyjątkowo', 'nieznośnie', 'okrutnie' ]
    var adjectives = ['parszywy', "groźny", "wąski", "kaprawy", "kulawy", "jedooki", "rudy", "wąsaty", "śmierdzący", "waleczny", "praworządny", "złośliwy" ]
    var names = [ "kalafior", 'brokuł' ]

    newName = shuffle(prefix)[0] + " " + shuffle(adjectives)[0] + " " + shuffle(names)[0]

    $scope.changeNick(newName);
  }
  $scope.changeNick = function(name) {
    $scope.nickName = name;
    nickName = name;
    if($scope.usedNicks.indexOf(nickName) === -1){ 
      $scope.usedNicks = $scope.usedNicks.concat(nickName);
    }
  }
  $scope.sendMessage = function() {
    var match = $scope.message.match('^\/nick (.*)');

    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
      var oldNick = nickName;
      $scope.changeNick(match[0]);
      $scope.message = '';
      $scope.messageLog = messageFormatter(new Date(), 
                      nickName, 'nick changed - from ' + 
                        oldNick + ' to ' + nickName + '!') + $scope.messageLog;
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
