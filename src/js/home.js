//                Main/Home J.S
import * as model from "./model.js";
// View Classes Imports
import CurrView from "./views/currWeatherView.js";
import TimeDateLocal from "./views/timeDateLocalView.js";
import Hours from "./views/hoursView.js";
import WeekView from "./views/weekView.js"; 
import Cities from "./views/citiesView.js";
import weekView from "./views/weekView.js";
import Search from "./views/searchView.js";
import hoursView from "./views/hoursView.js";
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

const searchPage = async function(){
  const query = Search.getQuery();
  console.log(query);
  const data = await model.fetchSearchCoords(query);
  await model.fetchSearchData(data);
  await model.fetchCurrentData(data);
  console.log(model.overallWeathData2.current);
  CurrView.render(model.overallWeathData2.current);
  TimeDateLocal.render(model.overallWeathData2.current);
  CurrView._dynamicBackgrounds();
}

const currentWeather = async function () {
  navigator.geolocation.getCurrentPosition(async (c) => {
    const { longitude, latitude } = c.coords;
    model.overallWeathData2.usersCoords.lat = latitude;
    model.overallWeathData2.usersCoords.long = longitude;
    await model.fetchWeatherCurrent(latitude, longitude);
    await model.fetchForecastData(latitude, longitude);
    CurrView.render(model.overallWeathData2.current);
    TimeDateLocal.render(model.overallWeathData2.current);
    CurrView._dynamicBackgrounds();
  });
};

const currentHours = function(){
  Hours.render(model.overallWeathData2.forecast.hours);
}

const nextWeekForecase = function(){
  weekView.render(model.overallWeathData2.forecast.nextWeek);
}

const citiesForecast = async function(){
  // done like this because of the dsign pattern
  const coordsData = await model.fetchCitiesCoords()
  const data = await model.fetchCitiesData(coordsData)
  console.log(data)
  Cities.render(data.cities)
  console.log(model.overallWeathData2)
}

const init = function(){
  // was using currView
  Search.currentViewHandlerAndClickEvent(currentWeather);
  Hours.addHoursHandler(currentHours)
  weekView.addWeekHandler(nextWeekForecase)
  Cities.addCityHandler(citiesForecast)
  //
  Search.searchHandler(searchPage)
  // TimeDateLocal.timeDateLocalHandler(currentWeather);
}
init()

    

