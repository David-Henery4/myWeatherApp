import View from "./view.js"

class WeekView extends View {
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
};

export default new WeekView();