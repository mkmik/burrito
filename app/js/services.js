'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    factory('Tables', function(LocalResource) {
        return LocalResource("Tables");
    }).factory('Team', function() {
        function Team() {
        };

        return Team;
    }).
    value('version', '0.1');
