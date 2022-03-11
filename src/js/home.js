import "core-js/stable";
import "regenerator-runtime/runtime";
//                Main/Home J.S
import * as model from "./model.js";
// View Classes Imports
import CurrView from "./views/currWeatherView.js";
import TimeDateLocal from "./views/timeDateLocalView.js";
import Hours from "./views/hoursView.js";
import Cities from "./views/citiesView.js";
import weekView from "./views/weekView.js";
import Search from "./views/searchView.js";
////////////////////////


/**
 * Function called by the handler in the "searchView"
 * @type {fetchSearchCoords} takes query returns coords
 * @type {fetchSearchData} takes coords and fetches data to the overallWeather object in the model
 * @type {fetchSCurrentData} takes coords and fetches data to the overallWeather object in the model
 * @method render takes data from overall object to be displayed in the UI by the 'CurrView'
 * @method render takes time & date from overall object to be displayed in the UI by the 'TimeDateLocal' view.
 * @method backgroundsData Triggers dynamic background based on current weather
 */
const searchPage = async function(){
  try {
    const query = Search.getQuery();
    const data = await model.fetchSearchCoords(query);
    await model.fetchSearchData(data);
    await model.fetchCurrentData(data);
    CurrView.render(model.overallWeathData2.current);
    TimeDateLocal.render(model.overallWeathData2.current);
    CurrView.backgroundsData()
  } catch(err){
    Search._searchIconAction();
    console.log(`SearchPage error happening: ${err}`)
    Search.renderErrorMsg()
  }
}

/**
 * Fucnction called by the 'current weather' button in the 'searchView'. Gets users location and renders the weather data.
 * @type {callback} getCurrentPosition Gets the users current coordinates
 * @async fetchWeatherCurrent Takes coordinates to the fetch data functions 
 * @async fetchForecastData Takes coordinates to the fetch data functions .
 * @method render Takes data from overallWeather object and renders it in the 'CurrView' and 'TimeDateLocal' to the UI.
 * @method backgroundsData Creates dynamic background for the current view based on the current weather data.
 */
const currentWeather = async function () {
  navigator.geolocation.getCurrentPosition(async (c) => {
      try{
        const { longitude, latitude } = c.coords;
        await model.fetchWeatherCurrent(latitude, longitude);
        await model.fetchForecastData(latitude, longitude);
        CurrView.render(model.overallWeathData2.current);
        TimeDateLocal.render(model.overallWeathData2.current);
        CurrView.backgroundsData()
      } catch(err){
      Search._searchIconAction();
      console.error(`CurrentWeather error happening: ${err}`);
      CurrView.renderErrorMsg()
    }
    });
};

/**
 * Renders data into next five hours section. (Called by the 'Hours' handler)
 * @function currentHours
 * Takes data from overallWeather object
 * @method render Renders the data from the object into the 'Hours' view and into the UI of the hours section.
 */
const currentHours = function(){
  Hours.render(model.overallWeathData2.forecast.hours);
}

/**
 * Renders data into next five days section. (Called by the 'WeekView' handler)
 * @function nextWeekForecase
 * Takes data from overallWeather object
 * @method render Renders the data from the object into the 'WeekView' and into the UI of the hours section.
 * @method backgroundsData 
 * Creates Dynamic background for the week UI based on the weather data
 */
const nextWeekForecase = function(){
  weekView.render(model.overallWeathData2.forecast.nextWeek);
  weekView.backgroundsData();
}

/**
 * @async citiesForecast Gets cities data and renders to cities UI (Called by the cities handler)
 * @method render city data and renders it to the 'Cities' view and then renders it to the cities section UI
 */
const citiesForecast = async function(){
  try{
    const coordsData = await model.fetchCitiesCoords()
    const data = await model.fetchCitiesData(coordsData)
    Cities.render(data.cities)
  } catch(err){
    console.log(`CitiesForecast error happening: ${err}`);
    Cities.renderErrorMsg()
  }
}

/**
 * @function init Holds all the View handlers and waits for the events that trigger the views
 */
const init = function(){
  Search.currentViewHandlerAndClickEvent(currentWeather);
  Hours.addHoursHandler(currentHours)
  weekView.addWeekHandler(nextWeekForecase)
  Cities.addCityHandler(citiesForecast)
  Search.searchHandler(searchPage)
}
init()

// didnt work
// setTimeout(function(){
//   window.addEventListener("resize", () => {
//     let vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty("--vh", `${vh}px`);
//     console.log("works")
//   });
// },2000)

function resetHeight(){
  document.body.style.height = `${window.innerHeight}px`
}

window.addEventListener("resize", resetHeight)
resetHeight()