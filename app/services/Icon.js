angular.module('wifiUffLocation').service("Icon", ["BASE_URL", function(BASE_URL) {
  var self = this;

  var CHANNEL_ICONS = {
    1: "/images/circle-icon-green.png",
    6: "/images/circle-icon-purple.png",
    11: "/images/circle-icon-red.png",
    other: "/images/circle-icon-blue.png"
  };

  self.generateChannelIcon = function(snmpInfo, zoom, mapDimensions) {
    var width = mapDimensions[0]*0.1;
    var height = mapDimensions[1]*0.1;
    var url = CHANNEL_ICONS[snmpInfo.channel] || CHANNEL_ICONS.other;
    var originalSize = [width + snmpInfo.power/15 , width + snmpInfo.power/15];
    return {
      iconUrl: BASE_URL + CHANNEL_ICONS[snmpInfo.channel],
      originalSize: originalSize,
      iconSize: self.getIconSize(originalSize, zoom),
      opacity: 0.7
    };
  };

  self.getIconSize = function(originalSize, zoom) {
    var size = [originalSize[0] * (Math.pow(2, zoom)), originalSize[1] * Math.pow(2, zoom)];
    if (zoom == 0) {
      size = originalSize;
    } else {
      if (zoom <= -1) {
        size = [originalSize[0] / Math.pow(2, Math.abs(zoom)), originalSize[1] / Math.pow(2, Math.abs(zoom))]
      };
    };
    return size;
  };

  self.resize = function(icon, zoom) {
    icon.iconSize = self.getIconSize(icon.originalSize, zoom);
  };

  self.generate = function(snmpInfo, zoom, mapDimensions) {
    return self.generateChannelIcon(snmpInfo, zoom, mapDimensions);
  };
}]);
