'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive('draggableTeam', function() {
      return {
          link: function(scope, element, attrs) {
              $(element).draggable({scope: 'team',
                                    handle: '.icon-move',
                                    revert: true,
                                    revertDuration: 200,
                                    cursor: 'move',
                                    snap: true,
                                    zIndex: 200,
                                    containment: '#tables',
                                    });
          }
      };
  });
