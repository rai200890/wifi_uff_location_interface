angular.module('wifiUffLocation').service("Marker", ["Icon", function(Icon) {
  var self = this;

  self.generate = function(ap, center, snmpInfo) {
    var label = "<p>" + ap.name + " , " + ap.location.name + "</p>";
    var message = null;
    var icon = null;
    if (snmpInfo) {
      icon = Icon.generate(snmpInfo, center.zoom);
      message = "<p><span><strong>Channel:</strong> "+ snmpInfo.channel + "</p>";
      message += "<p><strong>Power:</strong> " + snmpInfo.power + "</p>";
    };
    return {
      lat: ap.map_latitude || center.lat,
      lng: ap.map_longitude || center.lng,
      layer: ap.name,
      message: message,
      riseOnHover: true,
      icon: icon,
      label: {
        message: label,
        options: {
            clickable: true,
            direction: 'auto',
            noHide: true
        }
      }
    }
  };

  self.resizeIcon = function(marker, zoom) {
    Icon.resize(marker.icon, zoom);
  };

}]);
