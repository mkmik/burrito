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
    }).factory('Table', function(Team) {
        function Table(number) {
            this.number = number;
            this.fixed = new Team();
            this.moving = new Team();
        };

        return Table;
    }).
    value('version', '0.1');
