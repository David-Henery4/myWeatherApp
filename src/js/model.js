//                          Model
console.log("Model: Working");

// Weather Object (openweathermap)
/**
 * All Fetched data is stored in this object.
 * @type {object}
 * For use thoughout our project
 * @property {current}
 * Is the current weather data.
 * @property {forecast}
 * Contains forcast data for hours and week sections.
 * @property {cities}
 * Contains current weather data for the cities section
 * @property {userSearches}
 * Contains string of user search query
 */
export const overallWeathData2 = {
  current: {},
  forecast: {
    hours: {},
    nextWeek: {},
  },
  cities: {},
  userSearches: {},
  usersCoords: {},
  // userSearchData was here but not needed
};

//       FETCHING WEATHER DATA (from openweathermap)
//                 FOR CURRENT USER LOCATION

//          current weather data (metric)
/**
 * Gets Current weather based on users location
 * @param {number} lat 
 * Current Users Latitude
 * @param {number} long
 * Current Users Longitude 
 */
export const fetchWeatherCurrent = async function (lat, long) {
  try {
    overallWeathData2.usersCoords.lat = lat;
    overallWeathData2.usersCoords.long = long;
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=03c0ab070c431f94285f47bf8bf82c9c`
    );
    if (!res.ok) {
      throw new Error(`error found: ${res.status}`);
    }
    console.log(res);
    const data = await res.json();
    console.log(data);
    handlingCurWeather(data);
    console.log(overallWeathData2.current)
    // return overallWeathData2.current;
  } catch (err) {
    console.log(err.message)
    console.error(`error stuck here: ${err.message}`)
    throw err
  }
};

// Handling current weather data
/**
 * This function destructors the data before storing it in the     overallWeather object.
 * @param {object} data 
 * Weather data from the fetchWeatherCurrent function
 */
export const handlingCurWeather = function (data) {
  // messy, must be better way! (Maybe destructuring or loop)
  console.log(data);
  overallWeathData2.current.WeathDescript = data.weather[0].description;
  overallWeathData2.current.weathType = data.weather[0].main;
  overallWeathData2.current.weathIcon = data.weather[0].icon;
  overallWeathData2.current.wind = data.wind.speed;
  overallWeathData2.current.sunrise = data.sys.sunrise;
  overallWeathData2.current.sunset = data.sys.sunset;
  overallWeathData2.current.updateTime = data.dt;
  overallWeathData2.current.locationName = data.name;
  overallWeathData2.current.minTemp = data.main.temp_min;
  overallWeathData2.current.maxTemp = data.main.temp_max;
  overallWeathData2.current.feelsLike = data.main.feels_like;
  overallWeathData2.current.temp = data.main.temp;
};

//            FETCHING CURRENT DAY HOURS FORCAST
//                 FOR CURRENT USER

/**
 * Gets forcast data for users current location
 * @param {number} lat
 * Users latitude 
 * @param {number} long 
 * Users longitude
 */
export const fetchForecastData = async function (lat, long) {
  try{
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current&units=metric&appid=03c0ab070c431f94285f47bf8bf82c9c`;
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);
    handlingHourlyData(data);
    handlingNextWeekData(data);
    // const unix = data.daily[0].dt;
    // console.log(new Date(unix*1000))
    console.log(overallWeathData2.current)
  } catch(err){
    throw err.message
  }
};

/**
 * Takes in Hours data from fetchForecastData and applies it to the overallWeather object.
 * @param {Array|object} hours
 * Takes in Array of objects that represent each hour and is reduced to only the next five hours 
 */
const handlingHourlyData = function (hours) {
  const next5Hours = hours.hourly.slice(1, 6);
  overallWeathData2.forecast.hours = next5Hours;
  console.log(overallWeathData2);
};

/**
 * Takes in days of the week data from fetchForecastData and applies it to the overallWeather object.
 * @param {Array|object} week
 * Takes in Array of objects that represent each day of the week and is reduced to only the next five days.
 */
const handlingNextWeekData = function (week) {
  const next5Days = week.daily.slice(1, 6);
  overallWeathData2.forecast.nextWeek = next5Days;
  console.log(overallWeathData2);
};

//            FETCHING CITIES DATA

// Fetching Cities Coords
/**
 * Loops though list of city locations and performs geocoding to get the coordinates for each city.
 * @returns {Array} An array of coordinates for each city we later use for getting each cities current weather.
 */
export const fetchCitiesCoords = async function () {
  try{
    const top10Cities = [
      "London",
      "Lisbon",
      "Moscow",
      "Rio-de-janeiro",
      "Mexico-city",
      "Singapore",
      "Melbourne",
      "Barcelona",
      "Rome",
      "New-york",
    ];
    //
    const cityLocations = [];
    await Promise.all(
      top10Cities.map(async (city, i) => {
        const res = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=03c0ab070c431f94285f47bf8bf82c9c`
        );
        if (!res.ok){
          throw new Error("error getting cities coords")
        }
        const data = await res.json();
        cityLocations.push(data);
      })
    );
    const cityCoordsRay = cityLocations.flat();
    return cityCoordsRay;
  } catch (err){
    console.log('Passes though here')
      throw err
  }
};

// Fetching cities current data
/**
 * Uses city coordinates to fetch weather data about those locations.
 * @param {Array} cityCoords Array of city coordinates
 * @returns {object} overallweather object with the cities weather data added, returned to the controler to be renderd into the current weather view
 */
export const fetchCitiesData = async function (cityCoords) {
  try {
    const cityData = [];
    await Promise.all(
      cityCoords.map(async (city) => {
        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=03c0ab070c431f94285f47bf8bf82c9c`
        );
        if (!res.ok){
          throw new Error(`error getting cities data: ${res.status}`)
        }
        const data = await res.json();
        cityData.push(data);
      })
    );
    cityData.map((city) => {
      if (city.name === "Chiado") city.name = "Lisbon";
      if (city.name === "Sant Pere, Santa Caterina i La Ribera")
        city.name = "Barcelona";
    });
    // sort and distribute
    cityData.sort((a, b) => a.name.localeCompare(b.name));
    overallWeathData2.cities = cityData;
    console.log(`This is flowing`, overallWeathData2);
    return overallWeathData2;
  } catch(err){
    throw err
  }
};
///////////////////////////////////////////////////

//        WEATHER DATA FROM SEARCH QUERY

// Fetching Coords on user search query
/**
 * Takes in user input query and fetches the coordinates for that location
 * @param {string} query Users search input
 * @returns {number} coords from query
 */
export const fetchSearchCoords = async function (query) {
  try{
    // console.log(query)
    const queryLower = query.slice(1);
    const readyquery = query[0].toUpperCase().concat(queryLower);
    console.log(readyquery);
    overallWeathData2.userSearches = readyquery;
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${readyquery}&limit=1&appid=03c0ab070c431f94285f47bf8bf82c9c`
    );
    if (!res.ok){
      throw new Error(`Error from Response: ${res.status}`)
    }
    const data = await res.json();
    console.log(data);
    return data;
    // fetchSearchData(data)
    // fetchCurrentData(data)
  } catch(err){
    throw err
  }
};

// Fetch hourly and next week weather data from query
/**
 * Fetches forecast data from coordinates and sends them to the handler functions to be formated and stored in overallWeather object
 * @param {number} coordData coordinates from input query
 */
export const fetchSearchData = async function (coordData) {
  try{
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordData[0].lat}&lon=${coordData[0].lon}&units=metric&exclude=minutely,alerts&appid=03c0ab070c431f94285f47bf8bf82c9c`;
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`Error from Response: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    handlingHourlyData(data);
    handlingNextWeekData(data);
  } catch(err){
    console.log(`from forecast from query: ${err.message}`)
    throw err
  }
};

// Fetch Current weather Data from query
/**
 * Fetches Current weather data from coordinates and sends them to the handler functions to be formated and stored in overallWeather object
 * @param {number} coordData coordinates from input query
 */
export const fetchCurrentData = async function (coordData) {
  try {
    const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${coordData[0].lat}&lon=${coordData[0].lon}&units=metric&appid=03c0ab070c431f94285f47bf8bf82c9c`;
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`Error from Response: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    console.log(overallWeathData2);
    handlingCurWeather(data);
  } catch (err) {
    console.log(`from current from query: ${err.message}`);
    throw err;
  }
};
