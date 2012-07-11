'use strict';

/* Controllers */


function TablesCtrl($scope, tablesManager) {
    $scope.addTable = function() { tablesManager.addTable(); };
    $scope.removeTable = function(table) { tablesManager.removeTable(table); };
}


function ScoresCtrl() {}


function NavCtrl($scope, $location, $rootScope) {
    $scope.views = [{path: '/tables', title: "Tavoli"},
                    {path: '/scores', title: "Punteggi"}];

    $rootScope.$watch(function() {return $location.path(); }, function() {
        $scope.currentPage = $location.path();
    });

    $scope.activeNav = function(view) {
        return view.path == $scope.currentPage ? "active" : "";
    };
}
