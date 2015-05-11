'use strict';

angular
  .module('chatApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngWebSocket',	
    // 'usedNicks'
  ])
  .value('nickName', 'anonymous', [])
