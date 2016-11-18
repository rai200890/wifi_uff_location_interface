angular.module('wifiUffLocation').controller("ApListController", ["Ap", function(Ap) {
  var ctrl = this;
  ctrl.aps = [];
  ctrl.loading = true;
  Ap.query().success(function(data) {
    ctrl.aps = data;
  }).finally(function(){
    ctrl.loading = false;
  });
  ctrl.displayedAps = [].concat(ctrl.aps);
}]);
