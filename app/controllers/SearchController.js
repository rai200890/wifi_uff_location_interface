angular.module('wifiUffLocation').controller("SearchController", ["$scope", "$stateParams", "$state", "$stateParams",
  "leafletData", "FileUploader", "API_URL", "Ap", "Department", "Marker", "SNMPStatus", "Auth",
  function($scope, $stateParams, $state, $stateParams,
    leafletData, FileUploader, API_URL, Ap, Department, Marker, SNMPStatus, Auth) {

    var uploader = $scope.uploader = new FileUploader({
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + Auth.getToken()
      }
    });

    $scope.hasMap = null;
    $scope.loading = false;
    $scope.uploading = false;
    $scope.layers = {
      baselayers: {},
      overlays: {}
    };
    $scope.markers = {};
    $scope.center = {
      lat: 0,
      lng: 0,
      zoom: -2
    };
    $scope.defaults = {
      maxZoom: 1,
      minZoom: -2,
      zoomControl: true,
      crs: 'Simple'
    };
    $scope.events = {
      map: {
        enable: ['click', 'drag', 'blur', 'touchstart', 'mouseover'],
        logic: 'emit'
      },
      marker: {
        enable: ['click', 'drag', 'mouseover'],
        logic: 'emit'
      }
    };

    $scope.legend = null;

    $scope.typeaheadNoResults = false;

    $scope.departmentID = $stateParams.department_id || null;

    $scope.department = null;

    $scope.typeaheadDepartment = function(value) {
      return Department.typeahead(value);
    };

    $scope.typeaheadSelected = function(department) {
      $scope.departmentID = department.id;
      $scope.loadMap(department.id);
    };

    $scope.saveLocations = function() {

    };

    $scope.restoreLocations = function() {

    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      $scope.uploading = false;
      $scope.success = "Map has been uploaded with success";
      $scope.loadMap($scope.departmentID);
    };

    uploader.onErrorItem = function(fileItem, response, status, headers) {
      $scope.uploading = true;
      $scope.errors = response.errors;
    };

    $scope.upload = function() {
      $scope.uploading = true;
      var file = uploader.queue[uploader.queue.length - 1];
      file.url = API_URL + "/api/departments/" + $scope.departmentID + ".json";
      uploader.uploadItem(file);
      uploader.addToQueue(file);
    };

    $scope.loadMap = function(departmentID) {
      if (departmentID != null) {
        $scope.loading = true;
        Department.get(departmentID).success(function(response) {
          var department = response;
          $scope.loading = false;

          if (department.map_url) {
            $scope.hasMap = true;

            $scope.legend = {
              colors: ['#008000', '#800080', '#FF0000', '#0000FF'],
              labels: ['Canal 1', 'Canal 6', 'Canal 11', 'Outros']
            };

            var name = department.campus_name + ", " + department.department_name;

            var bounds = L.latLngBounds(department.map_bounds); //workaround

            leafletData.getMap().then(function(map) {
              map.setMaxBounds(bounds);
            });

            $scope.layers.baselayers.map = {
              name: name,
              type: 'imageOverlay',
              url: department.map_url,
              bounds: bounds,
              layerParams: {
                showOnSelector: false,
                noWrap: true,
                attribution: name
              }
            };

            Ap.query(department.id).success(function(aps) {
              aps.forEach(function(ap) {
                var message = "<p>" + ap.name + " - " + ap.syslocation + "</p>";
                var marker = {
                  lat: ap.latitude,
                  lng: -ap.longitude,
                  message: message,
                  layer: ap.name,
                  label: {
                    message: message,
                    options: {
                      direction: "auto",
                      noHide: true
                    }
                  },
                  focus: true,
                  draggable: true
                };

                $scope.layers.overlays[ap.name] = {
                  name: ap.name,
                  type: 'group',
                  visible: true
                }

                SNMPStatus.get(ap.id).success(function(data) {
                  $scope.markers[ap.name] = marker;
                  $scope.markers[ap.name].icon = Marker.getIcon(data.channel.value, data.power.value);
                }).error(function() {
                  $scope.markers[ap.name] = marker;
                });

              });
            });
          } else {
            $scope.loading = false;
            $scope.hasMap = false;
          };

        });
      };
    };

    $scope.loadMap($scope.departmentId);
  }
]);
