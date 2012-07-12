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
            if(!el.fixed.locked)
                teams.push(el.fixed);
            if(!el.mobile.locked)
                teams.push(el.mobile);
        });
        var shuffled = shuffle(teams);

        $scope.tables.forEach(function(el) {
            if(!el.fixed.locked)
                el.fixed = shuffled.pop();
            if(!el.mobile.locked)
                el.mobile = shuffled.pop();
        });
    }

    $scope.toggleLock = function(team) {
        team.locked = !team.locked;
    }

    $scope.rotate = function() {
        tablesManager.rotate();
    }
}


function ScoresCtrl($scope, Scores, config, tablesManager) {
    $scope.currentRound = 1;
    Scores.bind($scope, 'currentRound');

    $scope.$on('globalReset', function() {
        $scope.currentRound = 1;
    });

    $scope.nextRound = function(kind) {
        console.log("next round", kind, kind == 'rotate');
        if(kind == 'rotate')
            tablesManager.rotate();

        if($scope.currentRound < $scope.config.rounds)
            $scope.currentRound += 1;
    }

    $scope.prevRound = function() {
        if($scope.currentRound > 1)
            $scope.currentRound -= 1;
    }

    $scope.$watch('tables', function() {
        $scope.teamTables = [];
        $scope.tables.forEach(function(table) {
            $scope.teamTables.push({first: true, number: table.number, a: table.fixed.a, b: table.fixed.b});
            $scope.teamTables.push({number: table.number, a: table.mobile.a, b: table.mobile.b});
        });
    }, true);
}


function NavCtrl($scope, $location, $rootScope) {
    $scope.views = [{path: '/setup', title:'<i class="icon-cog"/> Impostazioni'},
                    {path: '/tables', title: '<i class="icon-group"/> Tavoli'},
                    {path: '/scores', title: '<i class="icon-book"/> Punteggi'}];

    $rootScope.$watch(function() {return $location.path(); }, function() {
        $scope.currentPage = $location.path();
    });

    $scope.activeNav = function(view) {
        return view.path == $scope.currentPage ? "active" : "";
    };
}
