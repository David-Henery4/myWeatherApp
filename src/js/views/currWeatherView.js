import View from "./view.js";
import cloudPlaceHolder from "url:../../images/cloudPlaceHolder.png";
import * as config from "../config.js";
import cloudy from "url:../../images/clouds.jpg"
import clear__skies from "url:../../images/clear-skies.jpg"
// let image;
// import backgroundImage from "url:../../images/foggy.jpg";

//

class CurrView extends View {
  _parentElement = document.querySelector(".current__day--wrap");
  // _bodyElement = document.querySelector("#body__images")

  constructor(){
    super()
    // this._dynamicBackgrounds()
  }

  currentViewHandler(handler) {
    window.addEventListener("load", handler)
  }
  
  _formatSunriseSunset(time){
    const newTime = new Date(time * 1000);
    const hour = newTime.getHours().toString().padStart(2, 0);
    const min = newTime.getMinutes().toString().padStart(2,0)
    return `${hour}:${min}`
  }
  
  // maybe refactor with parent(Alot of repeating code)
  _dynamicBackgrounds(){
    // Sunny Weather Background
    const randomSunny = config.BACKGROUNDSUN__DAY[Math.floor(Math.random() * config.BACKGROUNDSUN__DAY.length)];
    // Snowy Weather Background
    const snow = config.BACKGROUNDSNOW__DAY-Math.floor(Math.random()* config.BACKGROUNDSNOW__DAY.length);
    // Cloudy Weather Background
    const randomClouds = config.BACKGROUNDCLOUDY__DAY[Math.floor(Math.random() * config.BACKGROUNDCLOUDY__DAY.length)]
    // Partial Cloudy Weather
    const randomPartialClouds = config.BACKGROUNDPARTCLOUDY__DAY[Math.floor(Math.random() * config.BACKGROUNDPARTCLOUDY__DAY.length)]
    // Raining Weather Background
    const randomRain = config.BACKGROUNDRAIN__DAY[Math.floor(Math.random() * config.BACKGROUNDRAIN__DAY.length)]
    // ThunderStorm Weather BackGround
    const randomLightning = config.BACKGROUNDLIGHTN__DAY[Math.floor(Math.random() * config.BACKGROUNDLIGHTN__DAY.length)]
    // Foggy Weather Background
    const randomFog = config.BACKGROUNDFOG__DAY[Math.floor(Math.random() * config.BACKGROUNDFOG__DAY)]
    ////////

    // Show Snow
    if (this._data.weathType === "Snow"){
      this._generateBackground(snow)
    }
    // Show Clouds
    if (this._data.weathType === "Clouds"){
      this._generateBackground(randomClouds);
    }
    // Show Partial Clouds
    if (
      this._data.WeathDescript === "scattered clouds" ||
      this._data.WeathDescript === "few clouds"
    ) {
      this._generateBackground(randomPartialClouds);
    }
    // Show Rain
    if (this._data.weathType === "Rain" || this._data.weathType === "Drizzle") {
      this._generateBackground(randomRain);
    }
    // Show Clear
    if (this._data.weathType === "Clear"){
      this._generateBackground(randomSunny)
    }
    // Show Storm
    if (this._data.weathType === "Thunderstorm") {
      this._generateBackground(randomLightning);
    }
    // Show Fog
    if (this._data.weathType === "Fog") {
      this._generateBackground(randomFog);
    }
  }

  _generateBackground(image){
    document.body.style.backgroundImage = `url(${image})`;
    // console.log(image)
  }
  
  _generateMarkup() {
    return `<img class="weather__icon" src="http://openweathermap.org/img/wn/${
      this._data.weathIcon
    }@2x.png" alt=""/>
      <div class="current__weath--titles">
        <h1 class="curr__temp">${Math.round(this._data.temp)}°C</h1>
        <div class="title__seperator"></div>
        <h1 class="curr__weath">${this._data.weathType}</h1>
      </div>

      <div class="current__weath--details">
        <div class="sunrise">
          <p>${this._formatSunriseSunset(this._data.sunrise)}</p>
          <p>Sunrise</p>
        </div>

        <div class="sunset">
          <p>${this._formatSunriseSunset(this._data.sunset)}</p>
          <p>Sunset</p>
        </div>

        <div class="feelsLike">
          <p>${Math.round(this._data.feelsLike)}°C</p>
          <p>Feels Like</p>
        </div>

        <div class="wind">
          <p>${Math.trunc(this._data.wind)} mph</p>
          <p>Wind</p>
        </div>

        <div class="high__temp">
          <p>${Math.round(this._data.maxTemp)}°C</p>
          <p>High</p>
        </div>

        <div class="low__temp">
          <p>${Math.round(this._data.minTemp)}°C</p>
          <p>Low</p>
        </div>
      </div>`;
  }
}

export default new CurrView()
