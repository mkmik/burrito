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

                  var tmp = ui.draggable.data('draggable-team');
                  ui.draggable.data('draggable-team', $(element).data('draggable-team'));
                  $(element).data('draggable-team', tmp);
              }
          }
      };
  }).directive('contenteditable', function() {
      return {
          restrict: 'A', // only activate on element attribute
          require: '?ngModel', // get a hold of NgModelController
          link: function(scope, element, attrs, ngModel) {
              if(!ngModel) return; // do nothing if no ng-model

              if(attrs.type === "number")
                  ngModel.$parsers.push(function (value) {
                      var i = parseInt(value);
                      if(i > 0)
                          return i;
                      return 1;
                  });

              // Specify how UI should be updated
              ngModel.$render = function() {
                  element.html(ngModel.$viewValue || '');
              };

              if(attrs.hasOwnProperty('singleline')) {
                  element.bind('keydown', function(ev) {
                      if(ev.keyCode == 13) {
                          $(element).blur();
                          return false;
                      }
                  });
              }

              // Listen for change events to enable binding
              element.bind('blur keyup change', function() {
                  scope.$apply(read);
              });
              //read(); // initialize

              // Write data to the model
              function read() {
                  ngModel.$setViewValue(element.html());
              }
          }
      };
  });
