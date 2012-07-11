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
    }).factory('tablesManager', function($rootScope, Tables, Table) {
        function TablesManager() {
            $rootScope.tables = [];
            this.tables = $rootScope.tables
            Tables.bind($rootScope, 'tables');
        }

        TablesManager.prototype.addTable = function() {
            $rootScope.tables.push(new Table($rootScope.tables.length + 1));
            setTimeout(function() {$('#tables tr:last input:first').focus()}, 100);
        }

        TablesManager.prototype.removeTable = function(team) {
            for (var i = 0, ii = $rootScope.tables.length; i < ii; i++) {
                if (team === $rootScope.tables[i]) {
                    $rootScope.tables.splice(i, 1);
                }
            }
            // renumber
            for (var i = 0, ii = $rootScope.tables.length; i < ii; i++) {
                $rootScope.tables[i].number = i+1;
            }
        }


        return new TablesManager();
    }).
    value('version', '0.1');
