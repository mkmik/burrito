'use strict';

/* Controllers */


function MyCtrl1($scope, Tables, Table) {
    $scope.tables = [];
    Tables.bind($scope, 'tables');

    $scope.addTable = function() {
        $scope.tables.push(new Table($scope.tables.length + 1));
    }

    $scope.removeTable = function(team) {
        for (var i = 0, ii = $scope.tables.length; i < ii; i++) {
            if (team === $scope.tables[i]) {
                $scope.tables.splice(i, 1);
            }
        }
        // renumber
        for (var i = 0, ii = $scope.tables.length; i < ii; i++) {
            $scope.tables[i].number = i+1;
        }
    }
}


function MyCtrl2() {}


function NavCtrl($scope, $location, $rootScope) {
    $scope.views = [{path: '/view1', title: "Tavoli"},
                    {path: '/view2', title: "Punteggi"}];

    $rootScope.$watch(function() {return $location.path(); }, function() {
        $scope.currentPage = $location.path();
    });

    $scope.activeNav = function(view) {
        return view.path == $scope.currentPage ? "active" : "";
    };
}
