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
            Tables.bind($rootScope, 'tables');

            this.tables = $rootScope.tables;
        }

        TablesManager.prototype.addTable = function() {
            this.tables.push(new Table(this.tables.length + 1));
            setTimeout(function() {$('#tables tr:last input:first').focus()}, 100);
        }

        TablesManager.prototype.removeTable = function(table) {
            for (var i = 0, ii = this.tables.length; i < ii; i++) {
                if (table === this.tables[i]) {
                    this.tables.splice(i, 1);
                }
            }
            // renumber
            for (var i = 0, ii = this.tables.length; i < ii; i++) {
                this.tables[i].number = i+1;
            }
        }

        TablesManager.prototype.findTeam = function(team) {
            for (var i = 0, ii = this.tables.length; i < ii; i++) {
                var currentTable = this.tables[i];

                if(currentTable.fixed === team)
                    return {table: currentTable, side: 'fixed'};
                if(currentTable.moving === team)
                    return {table: currentTable, side: 'moving'};
            }
        }

        TablesManager.prototype.swap = function(a, b) {
            $rootScope.$apply(function() {
                var aPosition = this.findTeam(a);
                var bPosition = this.findTeam(b);

                var tmp = aPosition.table[aPosition.side];
                aPosition.table[aPosition.side] = bPosition.table[bPosition.side];
                bPosition.table[bPosition.side] = tmp;
            }.bind(this));
        }

        return new TablesManager();
    }).
    value('version', '0.1');
