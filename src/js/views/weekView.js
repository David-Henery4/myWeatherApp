import View from "./view.js"

class WeekView extends View {
  _parentElement = document.querySelector(".weeks__container")
  _weekBtn = document.querySelector(".week__btn");
  _weekSection = document.querySelector(".week__forecast--sect");
  _closeBtn = document.querySelector(".right__icon");

  constructor() {
    super();
    this._weekOpen();
    this._weekClose()
  }

  _toggleWeek() {
    this._weekSection.classList.toggle("week__forecast--active");
  }

  _weekOpen() {
    this._weekBtn.addEventListener("click", this._toggleWeek.bind(this));
    console.log("open")
  }
  _weekClose(){
    this._closeBtn.addEventListener("click", this._toggleWeek.bind(this));
    console.log("close")
  }

  addWeekHandler(handler){
    this._weekBtn.addEventListener("click", handler)
  }

  _generateMarkup(){
    return this._data.map(day => {
      return `
      <div class="week__box">
            <p class="week__day">Monday</p>
            <div class="week__icon--wrap">
              <img class="week__icon" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
            </div>
            <p class="week__date">16th Jan</p>
            <p class="week__temp">${day.temp.max}°C</p>
            <p class="week__weather">${day.weather[0].description}</p>
          </div>`;
    }).join("")
  }
};

export default new WeekView();