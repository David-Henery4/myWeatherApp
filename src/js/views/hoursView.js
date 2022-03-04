import View from "./view.js";
import CustomExitSvg from "url:../../images/CustomExitSvg.svg";
class Hours extends View {
  _parentElement = document.querySelector(".hours__container");
  _hoursCompleteSection = document.querySelector(".hours__slide--wrap");
  // _hoursOverlay = document.querySelector(".hours__overlay")
  _hoursBtn = document.querySelector(".today__btn");
  _exitHoursBtn = document.querySelector(".exit__icon");
  // 
  constructor() {
    super();
    this.removeSlide();
    this.addSlide();
  }

  _toggleSlide() {
    this._hoursCompleteSection.classList.toggle("slide-hours");
    this.overlay();
    // this._hoursOverlay.classList.toggle("hours__overlay--active");
  }

  addSlide() {
    this._hoursBtn.addEventListener("click", this._toggleSlide.bind(this));
  }
  removeSlide() {
    this._exitHoursBtn.addEventListener("click", this._toggleSlide.bind(this));
    this._generalOverlayEle.addEventListener("click", this._toggleSlide.bind(this));
    // (Only needed event delegation when the element are dynamicly created because we cant add event to them)
  }

  addHoursHandler(handler) {
    this._hoursBtn.addEventListener("click", handler);
  }

  getHour(unix) {
    const currentHour = new Date(unix * 1000);
    const local = navigator.language;
    const options = {
      hour: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat(local, options).format(currentHour);
  }

  _generateMarkup() {
    return this._data
      .map((el, i) => {
        return `
        <div class="hour__details--box">
          <h4 class="hour">${this.getHour(el.dt)}</h4>
          <p class="hour__description">${el.weather[0].description}</p>
          <p class="hour__temp">temp: ${Math.round(el.temp)}°C</p>
          <p class="hour__feelslike">feels:  ${Math.round(el.feels_like)}°C</p>
        </div>`;
      })
      .join(""); // must be something to do with map(didn't need this with forEach, but doesn't work with forEach Though!)
  }
}

export default new Hours();
