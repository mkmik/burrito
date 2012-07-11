'use strict';

/* Controllers */

function SetupCtrl($scope, $rootScope, config) {
    $scope.reset = function() {
        console.log("resetting");
        $rootScope.$emit('globalReset');
    }
}

function TablesCtrl($scope, tablesManager) {
    $scope.addTable = function() { tablesManager.addTable(); };
    $scope.removeTable = function(table) { tablesManager.removeTable(table); };
}


function ScoresCtrl() {}


function NavCtrl($scope, $location, $rootScope) {
    $scope.views = [{path: '/setup', title:"Impostazioni"},
                    {path: '/tables', title: "Tavoli"},
                    {path: '/scores', title: "Punteggi"}];

    $rootScope.$watch(function() {return $location.path(); }, function() {
        $scope.currentPage = $location.path();
    });

    $scope.activeNav = function(view) {
        return view.path == $scope.currentPage ? "active" : "";
    };
}
