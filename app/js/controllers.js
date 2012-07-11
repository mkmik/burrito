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

    function shuffle(array) {
        array = array.slice(0);
        var tmp, current, top = array.length;

        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

        return array;
    }

    $scope.shuffle = function(side) {
        var teams = [];
        $scope.tables.forEach(function(el) {
            if(!el[side].locked)
                teams.push(el[side]);
        });
        var shuffled = shuffle(teams);

        $scope.tables.forEach(function(el) {
            if(!el[side].locked)
                el[side] = shuffled.pop();
        });
    }

    $scope.shuffleAll = function() {
        var teams = [];
        $scope.tables.forEach(function(el) {
            teams.push(el.fixed);
            teams.push(el.mobile);
        });
        var shuffled = shuffle(teams);

        $scope.tables.forEach(function(el) {
            el.fixed = shuffled.pop();
            el.mobile = shuffled.pop();
        });
    }

    $scope.toggleLock = function(team) {
        team.locked = !team.locked;
    }
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
