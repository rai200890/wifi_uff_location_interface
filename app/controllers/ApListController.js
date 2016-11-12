angular.module('wifiUffLocation').controller("ApListController", ["Ap", function(Ap) {
  var ctrl = this;
  ctrl.aps = [];
  Ap.query().success(function(data) {
    ctrl.aps = data;
  });
  ctrl.displayedAps = [].concat(ctrl.aps);
}]);
