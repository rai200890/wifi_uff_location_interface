angular.module('wifiUffLocation').controller('DBUploaderController',
['$scope', 'FileUploader','API_URL', function($scope, FileUploader, API_URL) {
    var uploader = $scope.uploader = new FileUploader({
        url: API_URL+"/api/db_importer.json"
    });

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info("mandou um com sucesso");
    };

    uploader.onCompleteAll = function() {
      console.info("terminou o enviar os arquivos");
    };

    $scope.upload = function(){
      uploader.uploadAll();
    };

}]);
