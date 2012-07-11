'use strict';

/* Controllers */

function SetupCtrl($scope, $rootScope, config) {
    $scope.reset = function() {
        $rootScope.$emit('globalReset');
    }
}

function TablesCtrl($scope, tablesManager) {
    $scope.addTable = function() { tablesManager.addTable(); };
    $scope.removeTable = function(table) { tablesManager.removeTable(table); };
}


function ScoresCtrl($scope, Scores, config) {
    $scope.currentRound = 1;
    Scores.bind($scope, 'currentRound');

    $scope.$on('globalReset', function() {
        $scope.currentRound = 1;
    });

    $scope.nextRound = function() {
        if($scope.currentRound < $scope.config.rounds)
            $scope.currentRound += 1;
    }

    $scope.prevRound = function() {
        if($scope.currentRound > 1)
            $scope.currentRound -= 1;
    }

}


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
