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
import View from "./views/view.js";
// import hoursView from "./views/hoursView";
//
console.log("Home: Working");
//
//
if (module.hot) {
  module.hot.accept();
}
// console.log(model.weathData);
// console.log(model.overallWeathData2);

const searchPage = async function(){
  try {
    // Search._errorCheck = false;
    const query = Search.getQuery();
    console.log(query);
    const data = await model.fetchSearchCoords(query);
    await model.fetchSearchData(data);
    await model.fetchCurrentData(data);
    console.log(model.overallWeathData2.current);
    CurrView.render(model.overallWeathData2.current);
    TimeDateLocal.render(model.overallWeathData2.current);
    CurrView._dynamicBackgrounds();
  } catch(err){
    // Search._errorCheck = true;
    Search._searchIconAction();
    console.log(`SearchPage error happening: ${err}`)
    Search.renderErrorMsg()
  }
}

const currentWeather = async function () {
  navigator.geolocation.getCurrentPosition(async (c) => {
      try{
      const { longitude, latitude } = c.coords;
      model.overallWeathData2.usersCoords.lat = latitude;
      model.overallWeathData2.usersCoords.long = longitude;
      // could return & handle promise here!
      await model.fetchWeatherCurrent(latitude, longitude);
      await model.fetchForecastData(latitude, longitude);
      CurrView.render(model.overallWeathData2.current);
      TimeDateLocal.render(model.overallWeathData2.current);
      CurrView._dynamicBackgrounds();
    } catch(err){ // works
      console.error(`CurrentWeather error happening: ${err}`);
      CurrView.renderErrorMsg()
    }
    });
};

const currentHours = function(){
  Hours.render(model.overallWeathData2.forecast.hours);
}

const nextWeekForecase = function(){
  weekView.render(model.overallWeathData2.forecast.nextWeek);
  weekView.dataCheck();
  // weekView.dataCheck(model.overallWeathData2.forecast.nextWeek[0]);
}

const citiesForecast = async function(){
  try{
    // done like this because of the dsign pattern
    const coordsData = await model.fetchCitiesCoords()
    const data = await model.fetchCitiesData(coordsData)
    console.log(data)
    Cities.render(data.cities)
    console.log(model.overallWeathData2)
  } catch(err){ // works
    console.log(`CitiesForecast error happening: ${err}`);
    Cities.renderErrorMsg()
  }
}

const init = function(){
  // was using currView
  Search.currentViewHandlerAndClickEvent(currentWeather);
  Hours.addHoursHandler(currentHours)
  weekView.addWeekHandler(nextWeekForecase)
  Cities.addCityHandler(citiesForecast)
  Search.searchHandler(searchPage)
}
init()


