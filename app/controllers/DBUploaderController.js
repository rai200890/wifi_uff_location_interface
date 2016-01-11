angular.module('wifiUffLocation').controller('DBUploaderController',
['$scope', 'FileUploader', function($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: '/api/db_importer.json'
    });

    uploader.onSuccessItem = function(fileItem, response, status, headers) {

    };

    uploader.onCompleteAll = function() {
      console.info("terminou o enviar os arquivos");
    };

    $scope.upload = function(){
      uploader.uploadAll();
    };

}]);