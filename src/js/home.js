//                Main/Home J.S
import * as model from "./model.js";
import CurrView from "./views/currWeatherView.js";
import TimeDateLocal from "./views/timeDateLocalView.js";
import Hours from "./views/hoursView.js";
import WeekView from "./views/weekView.js"; 
import Cities from "./views/citiesView.js";
import weekView from "./views/weekView.js";
// import hoursView from "./views/hoursView";
//
console.log("Home: Working");
//
//
if (module.hot) {
  module.hot.accept();
}
//
// console.log(model.weathData);
// console.log(model.overallWeathData2);

const currentWeather = async function () {
  navigator.geolocation.getCurrentPosition(async (c) => {
    const { longitude, latitude } = c.coords;
    // console.log(longitude,latitude)
    model.overallWeathData2.usersCoords.lat = latitude;
    model.overallWeathData2.usersCoords.long = longitude;
    await model.fetchWeatherCurrent(latitude, longitude);
    await model.fetchForecastData(latitude, longitude);
    CurrView.render(model.overallWeathData2.current);
    TimeDateLocal.render(model.overallWeathData2.current);
    // move hours to 'current hours function once find the problem in added html
  });
};

const currentHours = function(){
  Hours.render(model.overallWeathData2.forecast.hours);
}

const nextWeekForecase = function(){
  weekView.render(model.overallWeathData2.forecast.nextWeek);
}

const citiesForecast = function(){
  model.fetchCitiesCoords()
}

const init = function(){
  CurrView.currentViewHandler(currentWeather);
  Hours.addHoursHandler(currentHours)
  weekView.addWeekHandler(nextWeekForecase)
  Cities.addCityHandler(citiesForecast)
  // TimeDateLocal.timeDateLocalHandler(currentWeather);
}
init()




