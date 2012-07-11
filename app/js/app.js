'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'LocalStorage']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/setup', {templateUrl: 'partials/setup.html', controller: SetupCtrl});
    $routeProvider.when('/tables', {templateUrl: 'partials/tables.html', controller: TablesCtrl});
    $routeProvider.when('/scores', {templateUrl: 'partials/scores.html', controller: ScoresCtrl});
    $routeProvider.otherwise({redirectTo: '/setup'});
  }]).run(function($rootScope, tablesManager) {
      $rootScope.range = function (from, to) {
          var res = [];
          for(var i = from; i < to; i++)
              res.push(i);
          return res;
      }
  });
