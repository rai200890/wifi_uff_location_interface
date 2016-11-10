angular.module('wifiUffLocation').controller('ImporterController', ['$scope', 'FileUploader', 'API_URL', 'Auth', function($scope, FileUploader, API_URL, Auth) {

  var uploader = $scope.uploader = new FileUploader({
    url: API_URL + "/api/db_importer.json",
    headers: {"Authorization": "Bearer " + Auth.getToken()}
  });

  $scope.alerts = [];
  $scope.loading = false;
  $scope.errors = null;
  $scope.success = null;

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    $scope.loading = false;
    $scope.alerts.push({
      message: response.success,
      type: "success"
    });
  };

  uploader.onErrorItem = function(fileItem, response, status, headers) {
    $scope.loading = false;
    $scope.alerts.push({
      message: response.errors,
      type: "danger"
    });
  };

  $scope.upload = function() {
    $scope.loading = true;
    var file = uploader.queue[uploader.queue.length - 1];
    uploader.uploadItem(file);
    uploader.addToQueue(file);
  };
}]);
