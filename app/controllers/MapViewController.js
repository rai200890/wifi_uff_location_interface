angular.module('wifiUffLocation').controller("MapViewController", ["$scope", "$stateParams", "$state",
  "leafletData", "Ap", "Department", "Marker", "SNMPStatus", "Auth",
  function($scope, $stateParams, $state, leafletData, Ap, Department, Marker, SNMPStatus, Auth) {
    var ctrl = this;
    ctrl.alerts = [];

    $scope.zoom = -3;
    $scope.layers = {
      baselayers: {},
      overlays: {}
    };
    $scope.maxbounds = {};
    $scope.markers = {};
    $scope.center = {
      lat: 0,
      lng: 0,
      zoom: $scope.zoom
    };
    $scope.defaults = {
      maxZoom: 1,
      minZoom: -3,
      zoomControl: true,
      doubleClickZoom: false,
      crs: 'Simple',
      legend: {
        legendData: null
      }
    };

    $scope.events = {
      map: {
        enable: ['click', 'drag', 'dragend', 'blur', 'touchstart', 'mouseover'],
        logic: 'emit'
      },
      marker: {
        enable: ['click', 'mouseover', 'drag', 'dragend'],
        logic: 'emit'
      }
    };
    $scope.legend = {};
    ctrl.typeaheadNoResults = false;
    ctrl.selectedAp = null;
    ctrl.unmarkedAps = [];
    ctrl.unmarkedAp = null;
    ctrl.editing = false;
    ctrl.department_id = $stateParams.department_id;

    ctrl.edit = function() {
      ctrl.legend = {};
      $scope.layers.overlays = {};
      $scope.layers.overlays['markers'] = {
          name: 'Markers',
          type: 'group',
          visible: true
      };
      angular.forEach($scope.markers, function(marker, name) {
        marker.layer = 'markers';
        delete marker.message;
        marker.icon = null;
        marker.draggable = true;
      });
      ctrl.editing = true;
    };

    ctrl.save = function() {
      ctrl.editing = false;
      var aps = [];
      angular.forEach($scope.markers, function(marker, id) {
        aps.push({
          id: id,
          map_latitude: marker.lat,
          map_longitude: marker.lng
        });
      });
      Department.put($stateParams.department_id, aps)
        .success(function() {
          ctrl.alerts = [{
            type: "success",
            messages: ["Ap's new configuration saved successfully!"]
          }];
        })
        .error(function(response) {
          ctrl.alerts = [{
            type: "danger",
            messages: response.errors
          }];
        }).finally(function() {
          reloadAps($stateParams.department_id);
        });
    };

    ctrl.cancel = function() {
      ctrl.editing = false;
      reloadAps($stateParams.department_id);
    };

    ctrl.addApToMap = function(ap, coordinates) {
      var marker = Marker.generate(ap, coordinates);
      marker.name = 'markers';
      marker.draggable = true;
      $scope.markers[ap.id] = marker;
      var index = ctrl.unmarkedAps.indexOf(ap);
      ctrl.unmarkedAps.splice(index, 1);

      if (ctrl.unmarkedAps.length > 0) {
        ctrl.unmarkedAp = ctrl.unmarkedAps[0];
      };
    };

    var loadMap = function(departmentID) {
      Department.get(departmentID).success(function(department) {
        var name = department.name + ", " + department.campus_name;
        var bounds = L.latLngBounds(department.map_bounds);

        //adicionar largura e altura, tamanho de marcador pode ser percentual do tamanho da imagem, 10%
        $scope.center.lat = department.map_center[0];
        $scope.center.lng = department.map_center[1];
        $scope.maxbounds = bounds;
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
        reloadAps(departmentID, bounds);
      });
    };

    var reloadAps = function(departmentID) {
      $scope.legend = {
        colors: ['#008000', '#800080', '#FF0000', '#0000FF'],
        labels: ['Channel 1', 'Channel 6', 'Channel 11', 'Other channels'],
        legendData: null
      };
      ctrl.unmarkedAps = [];
      $scope.markers = {};
      $scope.layers.overlays = {};
      Ap.query(departmentID).success(function(aps) {
        aps.forEach(function(ap) {
          if (ap.map_latitude == null && ap.map_longitude == null) {
            ctrl.unmarkedAps.push(ap);
          } else {
            loadSNMPInfo(ap);
          };
        });
      });
    };

    var loadSNMPInfo = function(ap) {

      SNMPStatus.get(ap.id).success(function(snmpInfo) {
        $scope.layers.overlays['channel_' + snmpInfo.channel] = {
          name: 'Channel '+ snmpInfo.channel,
          type: 'group',
          visible: true
        };
        $scope.markers[ap.id] = Marker.generate(ap, $scope.zoom, snmpInfo);
      }).error(function() {
        $scope.layers.overlays['unknown_channel'] = {
          name: 'Unknown Channel',
          type: 'group',
          visible: true
        };
        $scope.markers[ap.id] = Marker.generate(ap, $scope.zoom);

      }).finally(function() {

        $scope.markers[ap.id].draggable = false;
      });
    };

    var init = function() {
      loadMap($stateParams.department_id);
      $scope.$on('leafletDirectiveMarker.map.dragend', function(e, args) {
        $scope.markers[args.modelName].lat = args.model.lat;
        $scope.markers[args.modelName].lng = args.model.lng;
      });
      $scope.$on('leafletDirectiveMap.map.click', function(e, args) {
        var coordinates = args.leafletEvent.latlng;
        if (ctrl.unmarkedAp && ctrl.editing) {
          ctrl.addApToMap(ctrl.unmarkedAp, coordinates);
        };
      });
      $scope.$watch('center.zoom', function(newValue, oldValue) {
        angular.forEach($scope.markers, function(marker, name) {
          if (marker.icon !== null) {
            Marker.resizeIcon(marker, newValue);
          };
        });
      });
    };

    init();
  }
]);
