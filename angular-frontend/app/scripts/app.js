'use strict';

angular
  .module('chatApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngWebSocket'
  ])
  .value('nickName', 'anonymous')
