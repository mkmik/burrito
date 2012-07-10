'use strict';

/* Controllers */


function MyCtrl1($scope, Tables) {
    $scope.teams = [];
    Tables.bind($scope, 'teams');

    $scope.addTeam = function() {
        $scope.teams.push(['','']);
    }

    $scope.removeTeam = function(team) {
        for (var i = 0, ii = $scope.teams.length; i < ii; i++) {
            if (team === $scope.teams[i]) {
                $scope.teams.splice(i, 1);
            }
        }
    }
}


function MyCtrl2() {}


function NavCtrl($scope, $location, $rootScope) {
    $scope.views = [{path: '/view1', title: "View 1"},
                    {path: '/view2', title: "View 2"}];

    $rootScope.$watch(function() {return $location.path(); }, function() {
        $scope.currentPage = $location.path();
    });

    $scope.activeNav = function(view) {
        return view.path == $scope.currentPage ? "active" : "";
    };
}
