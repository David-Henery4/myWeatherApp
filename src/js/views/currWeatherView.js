import View from "./view.js";
import cloudPlaceHolder from "url:../../images/cloudPlaceHolder.png";
import * as config from "../config.js";
class CurrView extends View {
  _parentElement = document.querySelector(".current__day--wrap");
  // _iconElement = document.querySelector("")

  currentViewHandler(handler) {
    window.addEventListener("load", handler)
  }
  
  _formatSunriseSunset(time){
    const newTime = new Date(time * 1000);
    const hour = newTime.getHours().toString().padStart(2, 0);
    const min = newTime.getMinutes().toString().padStart(2,0)
    return `${hour}:${min}`
  }

  _dynamicBackgrounds(){
    const randomClouds = config.BACKGROUNDCLOUDY__DAY[Math.floor(Math.random() * config.BACKGROUNDCLOUDY__DAY.length)]
    
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
