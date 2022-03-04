import View from "./view.js";

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

  _toggleCities() {
    this._citiesSection.classList.toggle("cities__forecast--active");
  }

  _openCities() {
    this._citiesBtn.addEventListener("click", this._toggleCities.bind(this));
  }
  _closeCities() {
    this._closeBtn.addEventListener("click", this._toggleCities.bind(this));
  }

  addCityHandler(handler) {
    this._citiesBtn.addEventListener("click", handler);
  }

  _generateMarkup() {
    return this._data.map(city => {
      return `
      <div class="cities__box">
            <h4 class="cities__name">${city.name}</h4>
            <div class="cities__content">
              <p class="cities__temp">${Math.round(city.main.temp)}°C</p>
              <p class="cities__weath">${this.uppserCaseDescription(city.weather[0].description)}</p>
            </div>
          </div>`
    }).join("")
  }
}

export default new Cities()
