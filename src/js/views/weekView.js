import View from "./view.js";

class WeekView extends View {
  _parentElement = document.querySelector(".weeks__container");
  _weekBtn = document.querySelector(".week__btn");
  _weekSection = document.querySelector(".week__forecast--sect");
  _closeBtn = document.querySelector(".right__icon");

  constructor() {
    super();
    this._weekOpen();
    this._weekClose();
  }

  _toggleWeek() {
    this._weekSection.classList.toggle("week__forecast--active");
  }

  _weekOpen() {
    this._weekBtn.addEventListener("click", this._toggleWeek.bind(this));
    console.log("open");
  }
  _weekClose() {
    this._closeBtn.addEventListener("click", this._toggleWeek.bind(this));
    console.log("close");
  }

  addWeekHandler(handler) {
    this._weekBtn.addEventListener("click", handler);
  }

  gettingDate(uni){
  const date = new Date(uni*1000)
  console.log(date)
    const local = navigator.language;
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const dateSplit = (new Intl.DateTimeFormat(local, options).format(date)).split(",")
    return dateSplit
  }

  _generateMarkup() {
    return this._data
      .map((day) => {
        return `
      <div class="week__box">
            <p class="week__day">${this.gettingDate(day.dt)[0]}</p>
            <div class="week__icon--wrap">
              <img class="week__icon" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
            </div>
            <p class="week__date">${this.gettingDate(day.dt)[1]}</p>
            <p class="week__temp">${day.temp.max}°C</p>
            <p class="week__weather">${day.weather[0].description}</p>
          </div>`;
      })
      .join("");
  }
}

export default new WeekView();
