angular.module('wifiUffLocation').controller('ImporterController', ['$scope', 'FileUploader', 'API_URL', 'Auth', function($scope, FileUploader, API_URL, Auth) {
  var ctrl = this;

  ctrl.alerts = [];

  ctrl.uploader = new FileUploader({
    url: API_URL + "/db_importer.json",
    headers: {
      "Authorization": "Bearer " + Auth.getToken()
    }
  });

  ctrl.loading = false;
  ctrl.errors = null;
  ctrl.success = null;

  ctrl.uploader.onSuccessItem = function(fileItem, response, status, headers) {
    ctrl.loading = false;
    ctrl.alerts = [{
      messages: ['Database updated with success!'],
      type: "success"
    }];
  };

  ctrl.uploader.onErrorItem = function(fileItem, response, status, headers) {
    ctrl.loading = false;
    ctrl.alerts = [{
      messages: ['Invalid input file!'],
      type: "danger"
    }];
  };

  ctrl.upload = function() {
    ctrl.loading = true;
    var file = ctrl.uploader.queue[ctrl.uploader.queue.length - 1];
    ctrl.uploader.uploadItem(file);
    ctrl.uploader.addToQueue(file);
  };
}]);
