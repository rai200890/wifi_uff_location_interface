angular.module('wifiUffLocation').controller("ApListController", ["$scope", "Ap", function($scope, Ap) {
  $scope.aps = [];
  Ap.query().success(function(data) {
    $scope.aps = data;
  });
  $scope.displayedAps = [].concat($scope.aps);
}]);
