//                 Model
console.log("Model: Working");
//          Weather Object (openweathermap)
export const overallWeathData2 = {
  current: {},
  forecast: {
    hours: {},
    nextWeek: {},
  },
  cities: {},
  usersCoords: {},
  userSearches:{},
  userSearchInfo: {},
};

//       FETCHING WEATHER DATA (from openweathermap)
//                 FOR CURRENT USER LOCATION

//          current weather data (metric)
export const fetchWeatherCurrent = async function (lat, long) {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=03c0ab070c431f94285f47bf8bf82c9c`
  );
  const data = await res.json();
  console.log(data);
  handlingCurWeather(data);
};

// Handling current weather data
function handlingCurWeather(data) {
  // messy, must be better way! (Maybe destructuring or loop)
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
  console.log(overallWeathData2);
}

//            FETCHING CURRENT DAY HOURS FORCAST
//                 FOR CURRENT USER

export const fetchForecastData = async function (lat, long) {
  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current&units=metric&appid=03c0ab070c431f94285f47bf8bf82c9c`;
  const res = await fetch(URL);
  const data = await res.json();
  console.log(data);
  handlingHourlyData(data);
  handlingNextWeekData(data);
  // const unix = data.daily[0].dt;
  // console.log(new Date(unix*1000))
};

const handlingHourlyData = function (hours) {
  const next5Hours = hours.hourly.slice(1, 6);
  overallWeathData2.forecast.hours = next5Hours;
  console.log(overallWeathData2);
};

const handlingNextWeekData = function (week) {
  const next5Days = week.daily.slice(1, 6);
  overallWeathData2.forecast.nextWeek = next5Days;
  console.log(overallWeathData2);
};

//            FETCHING CITIES DATA

// Fetching Cities Coords
export const fetchCitiesCoords = async function () {
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
      const data = await res.json();
      cityLocations.push(data);
    })
  );
  const cityCoordsRay = cityLocations.flat();
  fetchCitiesData(cityCoordsRay);
};
fetchCitiesCoords()


// Fetching cities current data
const fetchCitiesData = async function (cityCoords) {
  console.log(cityCoords);
  /////////////////////
  const cityData = [];
  await Promise.all(
    cityCoords.map(async (city) => {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=03c0ab070c431f94285f47bf8bf82c9c`
      );
      const data = await res.json();
      cityData.push(data);
    })
  );
  cityData.map(city => {
    if (city.name === "Chiado") city.name = "Lisbon";
    if (city.name === "Sant Pere, Santa Caterina i La Ribera") city.name = "Barcelona"
  })
  // sort and distribute
  cityData.sort((a, b) => a.name.localeCompare(b.name));
  overallWeathData2.cities = cityData;
  console.log(overallWeathData2);
  ///////////////////
};