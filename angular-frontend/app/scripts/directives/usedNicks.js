(function() {
    'use strict';

    angular.module('chatApp')
    .directive('usedNicks', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'html/usedNicks.html',
            link: function($scope, $element) {
                console.log($scope);
                $scope.$watch('usedNicks', function(newValue, oldValue) {
                  var container = $element[0].children[0];
                  $scope.usedNicks = newValue;
                });
            }
        };
    });

}());
