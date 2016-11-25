angular.module('wifiUffLocation').service("Marker", ["Icon", function(Icon) {
  var self = this;

  self.generate = function(ap, zoom, snmpInfo, mapBounds) {
    var label = "<p>" + ap.name + " , " + ap.location.name + "</p>";
    var layer = 'markers';
    var message = null;
    var icon = null;
    if (snmpInfo) {
      icon = Icon.generate(snmpInfo, zoom, mapBounds);
      message = "<p><span><strong>Channel:</strong> " + snmpInfo.channel + "</p>";
      message += "<p><strong>Power:</strong> " + snmpInfo.power + "</p>";
      layer = 'channel_' + snmpInfo.channel;
    };
    return {
      lat: ap.map_latitude,
      lng: ap.map_longitude,
      layer: layer,
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
