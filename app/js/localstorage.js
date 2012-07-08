'use strict';

angular.module('LocalStorage', []).
    factory('LocalResource', function() {
        function LocalResource(prefix) {
            this.prefix = prefix;
        };

        LocalResource.prototype.get = function(name) {
            var strValue = localStorage[this.prefix + '_' + name];
            if (strValue === undefined)
                return undefined;
            return JSON.parse(strValue);
        }

        LocalResource.prototype.put = function(name, value) {
            if (value === undefined)
                localStorage.removeItem(this.prefix + '_' + name);
            else
                localStorage[this.prefix + '_' + name] = JSON.stringify(value);
        }

        LocalResource.prototype.bind = function($scope, name, attribute) {
            var attrName = attribute === undefined ? name : attribute;
            var savedValue = this.get(attrName);
            if (savedValue === undefined)
                this.put($scope[name]);
            else
                $scope[name] = this.get(attrName);

            $scope.$watch(name, function() {
                this.put(attrName, $scope[name]);
            }.bind(this), true);
        }

        return function(prefix) {
            return new LocalResource(prefix);
        };
    });
