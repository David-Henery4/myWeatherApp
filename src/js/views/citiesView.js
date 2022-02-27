import View from "./view.js";

class Cities extends View {
  constructor() {
    super();
    this._openCities()
    this._closeCities()
  }
  _citiesSection = document.querySelector(".cities__forecast--sect");
  _citiesBtn = document.querySelector(".cities__btn");
  _closeBtn = document.querySelector(".left__icon");

  _toggleCities(){
      this._citiesSection.classList.toggle("cities__forecast--active");
  }
  
  _openCities(){
      this._citiesBtn.addEventListener("click", this._toggleCities.bind(this))
      console.log("open Cities")
  };
  _closeCities(){
      this._closeBtn.addEventListener("click", this._toggleCities.bind(this))
      console.log("close Cities")
  };
}

export default new Cities()
