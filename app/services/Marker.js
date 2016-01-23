angular.module('wifiUffLocation').service("Marker",
["SNMPStatus", "BASE_URL", function(SNMPStatus, BASE_URL){
 var self = this;
 var CHANNEL_ICONS = {
  1: "/images/marker-icon-green.png",
  6: "/images/marker-icon-red.png",
  11: "/images/marker-icon-yellow.png",
  other: "/images/default_icon.png"
};

  self.getIcon = function(channel, power){
    var icon = {
          iconUrl: BASE_URL + CHANNEL_ICONS.other,
          iconSize: [25, 41]
        };
    if ([1,6,11].indexOf(channel)){
        //icon.iconUrl = BASE_URL + CHANNEL_ICONS[channel];
        //icon.iconSize[0] = 25*power*0.15;
        //icon.iconSize[1] = 41*power*0.15;
    };
    icon.iconUrl = BASE_URL + "/images/circle-icon-orange.png";
    icon.iconSize[0] = 50*power*0.1;
    icon.iconSize[1] = 50*power*0.1;
    return icon;
  };
}]);
