angular.module('wifiUffLocation').controller("MapUploadController", ["$stateParams", "$state",
    "FileUploader", "API_URL", "Department", "Auth",
    function($stateParams, $state, FileUploader, API_URL, Department, Auth) {
        var ctrl = this;
        ctrl.uploading = false;
        ctrl.uploader = new FileUploader({
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + Auth.getToken()
            }
        });
        ctrl.alerts = [];

        ctrl.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            ctrl.uploading = false;
            $state.go("root.departments.map", {
                department_id: $stateParams.department_id
            });
        };

        ctrl.uploader.onErrorItem = function(fileItem, response, status, headers) {
            ctrl.uploading = true;
            ctrl.alerts = [{
                type: "danger",
                messages: response.errors
            }];
        };

        ctrl.upload = function() {
            ctrl.uploading = true;
            var file = ctrl.uploader.queue[ctrl.uploader.queue.length - 1];
            file.url = API_URL + "/api/departments/" + ctrl.departmentID + ".json";
            ctrl.uploader.uploadItem(file);
            ctrl.uploader.addToQueue(file);
        };
    }
]);
