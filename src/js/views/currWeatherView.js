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
  //
  constructor() {
    super();
  }


  // was using this
  // currentViewHandler(handler) {
  //   // window.addEventListener("load", handler);
  //   this._getCurrentWeathBtn.addEventListener("click", handler)
  // };

  _formatSunriseSunset(time) {
    const newTime = new Date(time * 1000);
    const hour = newTime.getHours().toString().padStart(2, 0);
    const min = newTime.getMinutes().toString().padStart(2, 0);
    return `${hour}:${min}`;
  }

  // could move to view if we wanted to re-use for other sections
  _randomBackgrounds(imageArray) {
    const image = imageArray[Math.floor(Math.random() * imageArray.length)];
    return image;
  }

  _dynamicBackgrounds() {
    console.log("dynamicBackgrounds background active");
    console.log(this._data.weathType)
    console.log(this._data.WeathDescript)
    // Snowy Weather Background
    if (this._data.weathType === "Snow") {
      const snow = this._randomBackgrounds(config.BACKGROUNDSNOW__DAY);
      this._generateBackground(snow);
    }

    // Cloudy Weather Background
    if (this._data.weathType === "Clouds") {
      const randomClouds = this._randomBackgrounds(
        config.BACKGROUNDCLOUDY__DAY
      );
      this._generateBackground(randomClouds);
    }

    // Partial Cloudy Weather
    if (
      this._data.WeathDescript === "scattered clouds" ||
      this._data.WeathDescript === "few clouds"
    ) {
      const randomPartialClouds = this._randomBackgrounds(
        config.BACKGROUNDPARTCLOUDY__DAY
      );
      this._generateBackground(randomPartialClouds);
    }

    // Raining Weather Background
    if (this._data.weathType === "Rain" || this._data.weathType === "Drizzle") {
      const randomRain = this._randomBackgrounds(config.BACKGROUNDRAIN__DAY);
      this._generateBackground(randomRain);
    }

    // Sunny Weather Background
    if (this._data.weathType === "Clear") {
      const randomSunny = this._randomBackgrounds(config.BACKGROUNDSUN__DAY);
      this._generateBackground(randomSunny);
    }

    // ThunderStorm Weather BackGround
    if (this._data.weathType === "Thunderstorm") {
      const randomLightning = this._randomBackgrounds(
        config.BACKGROUNDLIGHTN__DAY
      );
      this._generateBackground(randomLightning);
    }

    // Foggy Weather Background
    if (this._data.weathType === "Fog" || this._data.weathType === "Haze" || this._data.weathType === "Mist") {
      const randomFog = this._randomBackgrounds(config.BACKGROUNDFOG__DAY);
      this._generateBackground(randomFog);
    }

    // Smokey Weather Background
    if (this._data.weathType === "Smoke"){
      const randomSmoke = this._randomBackgrounds(config.SMOKEY__DAY)
      this._generateBackground(randomSmoke)
    }

    // Tornado weather background
    if (this._data.weathType === "Tornado"){
      const tornado = this._randomBackgrounds(config.TORNADO__DAY)
      this._generateBackground(tornado)
    }

    // Ash weather background
    if (this._data.weathType=== "Ash"){
      const ash = this._randomBackgrounds(config.ASH__DAY);
      this._generateBackground(ash)
    }

    // Squall, dust & sandstorms weather background
    if (this._data.weathType === "Squall" || this._data.weathType === "Dust" ||this._data.weathType === "Sand"){
      const squallDustSand = this._randomBackgrounds(config.DUSTSTORM__DAY)
      this._generateBackground(squallDustSand)
    }
  }

  _generateBackground(image) {
    console.log("generate background active");
    document.body.style.backgroundImage = `url(${image})`;
  }


  _generateMarkup() {
    return `<img class="weather__icon" src="http://openweathermap.org/img/wn/${
      this._data.weathIcon
    }@2x.png" alt=""/>
      <div class="current__weath--titles">
        <h1 class="curr__temp">${Math.round(this._data.temp)}°C</h1>
        <div class="title__seperator"></div>
        <h1 class="curr__weath">${
         this.uppserCaseDescription(this._data.WeathDescript)}</h1>
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
