angular.module('wifiUffLocation').service("Marker",
["SNMPStatus", "BASE_URL", function(SNMPStatus, BASE_URL){
 var self = this;
 var CHANNEL_ICONS = {
  1: "/images/circle-icon-green.png",
  6: "/images/circle-icon-purple.png",
  11: "/images/circle-icon-red.png",
  other: "/images/circle-icon-blue.png"
};

  self.getIcon = function(channel, power){
    var icon = {
          iconUrl: BASE_URL + CHANNEL_ICONS.other,
          iconSize: [100, 100],
          opacity: 0.7
        };
    if ([1,6,11].indexOf(channel)){
        icon.iconUrl = BASE_URL + CHANNEL_ICONS[channel];
        icon.iconSize[0] = 50*power*0.15;
        icon.iconSize[1] = 50*power*0.15;
    };
    return icon;
  };
}]);
