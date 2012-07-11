'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'LocalStorage']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tables', {templateUrl: 'partials/tables.html', controller: TablesCtrl});
    $routeProvider.when('/scores', {templateUrl: 'partials/scores.html', controller: ScoresCtrl});
    $routeProvider.otherwise({redirectTo: '/tables'});
  }]);
