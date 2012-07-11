'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive('draggableTeam', function(tablesManager) {
      return {
          link: function(scope, element, attrs) {
              $(element).data('draggable-team', scope.$eval(attrs.draggableTeam));

              $(element).draggable({scope: 'team',
                                    handle: '.icon-move',
                                    revert: 'invalid',
                                    helper: 'clone',
                                    revertDuration: 200,
                                    cursor: 'move',
                                    snap: true,
                                    zIndex: 200,
                                    containment: '#tables',
                                    start: function() {
                                        $(element).addClass("ui-draggable-dragging-original");
                                    },
                                    stop: function() {
                                        $(element).removeClass("ui-draggable-dragging-original");
                                    }
                                    });

              $(element).droppable({drop: handleDrop,
                                    scope: 'team',
                                    tolerance: 'pointer',
                                    hoverClass: 'ui-droppable-dropping',
                                   });

              function handleDrop(event, ui) {
                  tablesManager.swap(ui.draggable.data('draggable-team'), $(element).data('draggable-team'));
              }
          }
      };
  });
