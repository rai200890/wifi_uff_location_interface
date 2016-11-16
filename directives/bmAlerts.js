angular.module('wifiUffLocation').directive("Auth", ["Auth", function() {
  return {
    restrict: 'E',
    scope: {
      bmItems: '='
    },
    templateUrl: '../views/alerts.html',
    controller: ['$scope', function($scope) {
      $scope.close = function(index) {
        $scope.bmItems.splice(index, 1);
      }
    }],
    link: function(scope, iElement, iAttrs, ctrl) {}
  }
}]);
