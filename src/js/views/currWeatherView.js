import View from "./view.js";

//
/**
 * @class 'CurrView' contains everything to do with the Current weather UI (inherits from the 'View' parent)
 */
class CurrView extends View {
  _parentElement = document.querySelector(".current__day--wrap");
  _backgroundElement = document.getElementById("body__element");
  _errorMessage = `Theres been an error finding your current location weather. Please try again later.`;
  //
  constructor() {
    super();
  }

  /**
   * Takes in unix time and converts to 24 hour format string.
   * @param {number} time 
   * Takes in unix time
   * @returns {string} Time in 24 hour format
   * 
   */
  _formatSunriseSunset(time) {
    const newTime = new Date(time * 1000);
    const hour = newTime.getHours().toString().padStart(2, 0);
    const min = newTime.getMinutes().toString().padStart(2, 0);
    return `${hour}:${min}`;
  }

  /**
   * @method backgroundsData Takes weather type & description and in puts them into the 'dynamicBackgrounds' function to create a random background image based on the current weather.
   */
  backgroundsData() {
    const type = this._data.weathType;
    const descript = this._data.WeathDescript;
    this.dynamicBackgrounds(type, descript);
  }

  /**
   * Contains markup specfic to the currrentWeatherView
   * @returns {string}
   * A markup which has been updated with relevent data
   * and ready to be rendered to the currentWeather UI by the 'render' method.
   */
  _generateMarkup() {
    return `<img class="weather__icon" src="http://openweathermap.org/img/wn/${
      this._data.weathIcon
    }@2x.png" alt=""/>
      <div class="current__weath--titles">
        <h1 class="curr__temp">${Math.round(this._data.temp)}°C</h1>
        <div class="title__seperator"></div>
        <h1 class="curr__weath">${this.uppserCaseDescription(
          this._data.WeathDescript
        )}</h1>
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
