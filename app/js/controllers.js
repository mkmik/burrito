'use strict';

/* Controllers */

function SetupCtrl($scope, $rootScope, config) {
    $scope.reset = function() {
        $rootScope.$emit('globalReset');
    };

    $scope.resetScores = function() {
        $rootScope.$emit('scoresReset');
    };

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


function ScoresCtrl($scope, Scores, config, tablesManager, scoresManager) {
    $scope.currentRound = 1;
    Scores.bind($scope, 'currentRound');

    $('#tables').disableSelection();

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
        function currentScore(player) {
            if(player.scores)
                return '../' + player.scores[$scope.currentRound];
            return '';
        }

        function totalScore(player) {
            if(player.scores) {
                var total = 0;
                for(var key in player.scores) {
                    total += parseInt(player.scores[key], 10);
                };
                return '../' + total;
            }
            return '';
        }

        $scope.teamTables = [];
        $scope.tables.forEach(function(table) {
            $scope.teamTables.push({first: true, number: table.number, a: table.fixed.a, b: table.fixed.b, currentScore: currentScore(table.fixed), totalScore: totalScore(table.fixed)});
            $scope.teamTables.push({number: table.number, a: table.mobile.a, b: table.mobile.b, currentScore: currentScore(table.mobile), totalScore: totalScore(table.mobile)});
        });
    }, true);

    $scope.toggleHistory = function() {
        config.showHistory = !config.showHistory;
        $scope.selectedTable = null;
    }

    $scope.$watch('!config.showHistory', function(inserting) {
        if(inserting)
            setTimeout(function() {$('#table').focus()}, 0);
    });

    $('#table').bind("keydown", function(ev) {
        if(ev.keyCode == 13) {
            setTimeout(function() {$('#matchpoints').focus()}, 0);
        }
    });

    $('#matchpoints').bind("change", function() {
        $scope.$apply(function() {
            $scope.acceptScore($scope.currentMatchpoints);
        });
    });

    $scope.acceptScore = function(matchpoints) {
        scoresManager.recordMatchpoints($scope.currentRound, $scope.selectedTable - 1, matchpoints);

        $scope.currentMatchpoints = undefined;
        if(config.autoNextTable)
            $scope.selectedTable += 1;
        else
            $scope.selectedTable = undefined;
        setTimeout(function() {$('#table').focus()}, 0);
    };

    $scope.selectTable = function(tableNumber) {
        if(!config.showHistory) {
            $scope.selectedTable = tableNumber;
            setTimeout(function() {$('#matchpoints').focus()}, 0);
        }
    };
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
