//        Dynamic weather background images

// THIS MODULE CONTAINS ALL BACKGROUND IMAGES AND ARRAYS THAT ARE USED FOR CREATING DYNAMIC BACKGROUNDS BASED ON THE WEAHTER!

// rain image imports
import dampDrizzle from "url:../images/damp-drizzle.jpg";
import rainLondon from "url:../images/rain-london.jpg";
import rainWindow from "url:../images/rain-window.jpg";
import rain from "url:../images/rain.jpg";
import raining from "url:../images/raining.jpg";

// fog image imports
import foggy from "url:../images/foggy.jpg";
import foggy_Field from "url:../images/foggy-field.jpg";
import foggy_Road from "url:../images/foggy-road.jpg";
import foggy_Path from "url:../images/foggy-path.jpg";
import foggy_Forrest from "url:../images/foggy-forrest.jpg";
import foggy_Lane from "url:../images/foggy-lane.jpg";
// misty image imports
import misty_forrest from "url:../images/Misty-forrest.jpg";
import misty_street from "url:../images/misty-street.jpg";
import misty_trees from "url:../images/misty-trees.jpg"

// dust storm image imports
import dust_storm from "url:../images/dust-storm.jpg";
import dust_storm_two from "url:../images/dust-storm-two.jpg";
import dust_storm_three from "url:../images/dust-storm-three.jpg";

// smokey
import smokey_forrest from "url:../images/smokey-forrest.jpg";
import smokey_trees from "url:../images/smokey-trees.jpg";

// ash & tornado
import ash from "url:../images/ash.jpg"
import tornado from "url:../images/tornado.jpg"


// sunny images imports
import clear_Skies_Morning from "url:../images/clear-skies-morning.jpg";
import clear_Skies from "url:../images/clear-skies.jpg";
import summer from "url:../images/summer.jpg";
import sunny_2 from "url:../images/sunny-2.jpg";
import sunny_Bridge from "url:../images/sunny-bridge.jpg";
import sunny_Morning from "url:../images/sunny-morning.jpg";
import sunny_Road from "url:../images/sunny-road.jpg";
import sunny_Warm from "url:../images/sunny-warm.jpg";
import sunny from "url:../images/sunny.jpg";

// lightning image imports
import lightning_Two from "url:../images/lightning-two.jpg";
import lightning_Fork from "url:../images/lightning-fork.jpg";
import lightning from "url:../images/lightning.jpg";
import lightning_Clouds from "url:../images/lightning-clouds.jpg";
import lightning_Storm from "url:../images/lightning-storm.jpg";

// clouds image imports
import clouds from "url:../images/clouds.jpg";
import cloudy from "url:../images/cloudy.jpg";
import cloudy_Morning from "url:../images/cloudy-morning.jpg";
import cloudy_Overcast from "url:../images/cloudy-overcast.jpg";
import overcast from "url:../images/overcast.jpg";

// partial clouds image imports
import partly_Cloudy from "url:../images/partly-cloudy.jpg";
import partly_Cloudy_2 from "url:../images/partly-cloudy-2.jpg";
import partly_Cloudy_Morning from "url:../images/partly-cloudy-morning.jpg";
import partly_Cloud_Day from "url:../images/partly-cloud-day.jpg";

// snow image imports
import snow_Bush from "url:../images/snow-bush.jpg";
import snowing_2 from "url:../images/snowing-2.jpg";
import snowing from "url:../images/snowing.jpg";
import snowy_Brella from "url:../images/snowy-brella.jpg";
import snowy from "url:../images/snowy.jpg";

//       background image source arrays

// Day Raining sources
export const BACKGROUNDRAIN__DAY = [
  dampDrizzle,
  rainLondon,
  rainWindow,
  rain,
  raining,
];

// day foggy sources
export const BACKGROUNDFOG__DAY = [
  foggy,
  foggy_Field,
  foggy_Road,
  foggy_Path,
  foggy_Forrest,
  foggy_Lane,
  misty_forrest,
  misty_street,
  misty_trees,
];

// day sunny sources
export const BACKGROUNDSUN__DAY = [
  clear_Skies_Morning,
  clear_Skies,
  summer,
  sunny_2,
  sunny_Bridge,
  sunny_Morning,
  sunny_Road,
  sunny_Warm,
  sunny,
];

// day lightning sources
export const BACKGROUNDLIGHTN__DAY = [
  lightning,
  lightning_Two,
  lightning_Fork,
  lightning_Clouds,
  lightning_Storm,
];

// day cloudy sources
export const BACKGROUNDCLOUDY__DAY = [
  clouds,
  cloudy_Morning,
  cloudy_Overcast,
  cloudy,
  overcast,
];

// day part cloudy sources
export const BACKGROUNDPARTCLOUDY__DAY = [
  partly_Cloud_Day,
  partly_Cloudy_2,
  partly_Cloudy_Morning,
  partly_Cloudy
];

// day snow sources
export const BACKGROUNDSNOW__DAY = [
  snow_Bush,
  snowing_2,
  snowing,
  snowy_Brella,
  snowy,
];

// day smokey sources
export const SMOKEY__DAY = [smokey_forrest,smokey_trees];

// day tornado sources
export const TORNADO__DAY = [tornado];

// day ash sources
export const ASH__DAY = [ash];

// day dust & sand & squall storm sources
export const DUSTSTORM__DAY = [dust_storm,dust_storm_two,dust_storm_three];
