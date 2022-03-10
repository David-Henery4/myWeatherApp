import View from "./view.js";

/**
 * @class 'Cities' contains everything to do with the Cities UI (inherits from the 'View' parent)
 */
class Cities extends View {
  constructor() {
    super();
    this._openCities();
    this._closeCities();
  }
  _parentElement = document.querySelector(".cities__container");
  _citiesSection = document.querySelector(".cities__forecast--sect");
  _citiesBtn = document.querySelector(".cities__btn");
  _closeBtn = document.querySelector(".left__icon");
  _errorMessage = `There has been a error getting the cities weather. Please try again later.`;

  /**
   * @method _toggleCities Toggles the cities styles to show & hide the cities UI
   */
  _toggleCities() {
    this._citiesSection.classList.toggle("cities__forecast--active");
  }

  /**
   * @method _openCities Listens for click on the cities button to activate the '_toggleCities' method
   */
  _openCities() {
    this._citiesBtn.addEventListener("click", this._toggleCities.bind(this));
  }
  
  /**
   * @method _openCities Listens for click on the exit icon in the cities UI to activate the '_toggleCities' method
   */
  _closeCities() {
    this._closeBtn.addEventListener("click", this._toggleCities.bind(this));
  }

  /**
   * This method is called in the 'home' module.
   * Its called when there is a click on the cities button in the UI.
   * @param {Function} handler
   * handler is 'citiesForecast' function in the 'home' module, which is called when the 'addCityHandler' method is called. 
   */
  addCityHandler(handler) {
    this._citiesBtn.addEventListener("click", handler);
  }

  /**
   * Contains markup specfic to the citiesView
   * @returns {string}
   * A markup which has been updated with relevent data
   * and ready to be rendered to the Cities UI by the 'render' method.
   */
  _generateMarkup() {
    return this._data
      .map((city) => {
        return `
      <div class="cities__box">
            <h4 class="cities__name">${city.name}</h4>
            <div class="cities__content">
              <p class="cities__temp">${Math.round(city.main.temp)}°C</p>
              <p class="cities__weath">${this.uppserCaseDescription(
                city.weather[0].description
              )}</p>
            </div>
          </div>`;
      })
      .join("");
  }
}

export default new Cities()
