import View from "./view.js";
import CustomExitSvg from "url:../../images/CustomExitSvg.svg";

/**
 * @class 'Search' contains everything to do with the search menu UI (inherits from the 'View' parent)
 */
class Hours extends View {
  _parentElement = document.querySelector(".hours__container");
  _hoursCompleteSection = document.querySelector(".hours__slide--wrap");
  _hoursBtn = document.querySelector(".today__btn");
  _exitHoursBtn = document.querySelector(".exit__icon");
  //
  constructor() {
    super();
    this.removeSlide();
    this.addSlide();
  }

  /**
   * @method _toggleSlide
   * Toggles the hours section and overlay style
   */
  _toggleSlide() {
    this._hoursCompleteSection.classList.toggle("slide-hours");
    this.overlay();
    // this._hoursOverlay.classList.toggle("hours__overlay--active");
  }

  /**
   * @method addSlide
   * Listens for the click in order to activate '_toggleSlide' method
   */
  addSlide() {
    this._hoursBtn.addEventListener("click", this._toggleSlide.bind(this));
  }
  /**
   * @method removeSlide
   * Listens for click on the hours exit icon & on the overlay, then activates the '_toggleSlide' to remove the stlyes.
   */
  removeSlide() {
    this._exitHoursBtn.addEventListener("click", this._toggleSlide.bind(this));
    this._generalOverlayEle.addEventListener(
      "click",
      this._toggleSlide.bind(this)
    );
    // (Only needed event delegation when the element are dynamicly created because we cant add event to them)
  }

  /**
   * @method addHoursHandler Is called in
   * the 'home' and listens for the click on the hours button
   * @param {function} handler
   * The handler function is the 'currentHours' function in the
   * 'home' module, which is called when hours button is clicked.
   */
  addHoursHandler(handler) {
    this._hoursBtn.addEventListener("click", handler);
  }

  /**
   * Converts unix time to give us the next current hour
   * @param {number} unix
   * Takes in unix time and converts to timestamp
   * @returns {string}
   * A string displaying the next hour in '12hour' format. (E.g - 10am)
   */
  getHour(unix) {
    const currentHour = new Date(unix * 1000);
    const local = navigator.language;
    const options = {
      hour: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat(local, options).format(currentHour);
  }

  /**
   * Contains markup specfic to the hoursView
   * @returns {string}
   * A markup which has been updated with relevent data
   * and ready to be rendered to the hours UI by the 'render' method.
   */
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
      .join("");
  }
}

export default new Hours();
