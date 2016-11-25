angular.module('wifiUffLocation').service("Icon", ["BASE_URL", function(BASE_URL) {
  var self = this;

  var CHANNEL_ICONS = {
    1: "/images/circle-icon-green.png",
    6: "/images/circle-icon-purple.png",
    11: "/images/circle-icon-red.png",
    other: "/images/circle-icon-blue.png"
  };

  self.generateBasicIcon = function(snmpInfo, zoom, mapBounds) {
    var originalSize = [20 + snmpInfo.power * 0.3 * 20, 20 + snmpInfo.power * 0.3 * 20];
    return {
      iconUrl: BASE_URL + CHANNEL_ICONS.other,
      originalSize: originalSize,
      iconSize: self.getIconSize(originalSize, zoom),
      opacity: 0.7
    };
  };

  self.generateChannelIcon = function(snmpInfo, zoom, mapBounds) {
    var originalSize = [100 + snmpInfo.power * 0.3 * 100, 100 + snmpInfo.power * 0.3 * 100];
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

  self.generate = function(snmpInfo, zoom, mapBounds) {
    console.log(mapBounds);
    return ([1, 6, 11].indexOf(snmpInfo.channel) !== -1) ? self.generateChannelIcon(snmpInfo, zoom, mapBounds) : self.generateBasicIcon(snmpInfo, zoom, mapBounds);
  };
}]);
