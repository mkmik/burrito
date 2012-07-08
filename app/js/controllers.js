'use strict';

/* Controllers */


function MyCtrl1($scope, Tables) {
    Tables.bind($scope, 'firstName');
    Tables.bind($scope, 'lastName');
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
