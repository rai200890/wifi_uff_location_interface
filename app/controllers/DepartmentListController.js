angular.module('wifiUffLocation').controller("DepartmentListController", ["$scope", "$stateParams", "$state", "$stateParams",
  "leafletData", "FileUploader", "API_URL", "Ap", "Department", "Marker", "SNMPStatus", "Auth",
  function($scope, $stateParams, $state, $stateParams,
    leafletData, FileUploader, API_URL, Ap, Department, Marker, SNMPStatus, Auth) {
    var ctrl = this;

    ctrl.uploader = new FileUploader({
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + Auth.getToken()
      }
    });
    ctrl.alerts = [];
    ctrl.hasMap = null;
    ctrl.loading = false;
    ctrl.uploading = false;
    ctrl.layers = {
      baselayers: {},
      overlays: {}
    };
    ctrl.markers = {};
    ctrl.center = {
      lat: 0,
      lng: 0,
      zoom: -2
    };
    ctrl.defaults = {
      maxZoom: 1,
      minZoom: -2,
      zoomControl: true,
      crs: 'Simple'
    };
    ctrl.events = {
      map: {
        enable: ['click', 'drag', 'blur', 'touchstart', 'mouseover'],
        logic: 'emit'
      },
      marker: {
        enable: ['click', 'drag', 'mouseover'],
        logic: 'emit'
      }
    };

    ctrl.legend = null;

    ctrl.typeaheadNoResults = false;

    ctrl.departmentID = $stateParams.department_id || null;

    ctrl.department = null;

    ctrl.typeaheadDepartment = function(value) {
      return Department.typeahead(value);
    };

    ctrl.typeaheadSelected = function(department) {
      ctrl.departmentID = department.id;
      ctrl.loadMap(department.id);
    };

    ctrl.saveLocations = function() {

    };

    ctrl.restoreLocations = function() {

    };

    ctrl.uploader.onSuccessItem = function(fileItem, response, status, headers) {
      ctrl.uploading = false;
      ctrl.loadMap(ctrl.departmentID);
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

    ctrl.loadMap = function(departmentID) {
      if (departmentID != null) {
        ctrl.loading = true;
        Department.get(departmentID).success(function(response) {
          var department = response;
          ctrl.loading = false;

          if (department.map_url) {
            ctrl.hasMap = true;

            ctrl.legend = {
              colors: ['#008000', '#800080', '#FF0000', '#0000FF'],
              labels: ['Canal 1', 'Canal 6', 'Canal 11', 'Outros']
            };

            var name = department.campus_name + ", " + department.department_name;

            var bounds = L.latLngBounds(department.map_bounds); //workaround

            leafletData.getMap().then(function(map) {
              map.setMaxBounds(bounds);
            });

            ctrl.layers.baselayers.map = {
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

                ctrl.layers.overlays[ap.name] = {
                  name: ap.name,
                  type: 'group',
                  visible: true
                }

                SNMPStatus.get(ap.id).success(function(data) {
                  ctrl.markers[ap.name] = marker;
                  ctrl.markers[ap.name].icon = Marker.getIcon(data.channel.value, data.power.value);
                }).error(function() {
                  ctrl.markers[ap.name] = marker;
                });

              });
            });
          } else {
            ctrl.loading = false;
            ctrl.hasMap = false;
          };

        });
      };
    };

    ctrl.loadMap(ctrl.departmentId);
  }
]);
