angular.module('wifiUffLocation').controller("ListApsController", ["$scope", "Ap", function($scope, Ap) {
  $scope.aps = [];
  Ap.query().success(function(data) {
    $scope.aps = data;
  });
  $scope.displayedAps = [].concat($scope.aps);
}]);
