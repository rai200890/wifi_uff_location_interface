angular.module('wifiUffLocation').controller('DBUploaderController',
['$scope', 'FileUploader','API_URL', function($scope, FileUploader, API_URL) {

    var uploader = $scope.uploader = new FileUploader({
        url: API_URL + "/api/db_importer.json"
    });
    var file = null;

    $scope.alerts = [];
    $scope.loading = false;
    $scope.errors = null;
    $scope.success = null;

    $scope.closeAlert = function(index){
      $scope.alerts.splice(index, 1);
    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      $scope.loading = false;
      $scope.alerts.push({message: response.success, type: "success"});
    };

    uploader.onErrorItem = function(fileItem, response, status, headers) {
      $scope.loading = false;
      $scope.alerts.push({message: response.errors, type: "danger"});
    };

    $scope.upload = function(){
      $scope.loading = true;
      file = uploader.queue[uploader.queue.length-1];
      uploader.uploadItem(file);
      uploader.addToQueue(file);
    };
}]);
