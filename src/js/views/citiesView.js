import View from "./view.js";

class Cities extends View {
  constructor() {
    super();
    this._openCities()
    this._closeCities()
  }
  // _parentElements = document.querySelectorAll(".cities__details")
  
  _citiesSection = document.querySelector(".cities__forecast--sect");
  _citiesBtn = document.querySelector(".cities__btn");
  _closeBtn = document.querySelector(".left__icon");

  _toggleCities(){
      this._citiesSection.classList.toggle("cities__forecast--active");
  }
  
  _openCities(){
      this._citiesBtn.addEventListener("click", this._toggleCities.bind(this))
  };
  _closeCities(){
      this._closeBtn.addEventListener("click", this._toggleCities.bind(this))
  };
  
  addCityHandler(handler){
  this._citiesBtn.addEventListener("click", handler)
  }

  _generateMarkup(){
    return 
  }
}

export default new Cities()
