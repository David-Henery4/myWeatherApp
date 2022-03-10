import View from "./view.js";

/**
 * @class WeekView contains everything to do with Weeks in the Week forecast UI. (inherits from the 'View' parent)
 */
class WeekView extends View {
  _parentElement = document.querySelector(".weeks__container");
  _weekBtn = document.querySelector(".week__btn");
  _weekSection = document.querySelector(".week__forecast--sect");
  _backgroundElement = document.getElementById("week__image");
  _closeBtn = document.querySelector(".right__icon");

  constructor() {
    super();
    this._weekOpen();
    this._weekClose();
    // this.dataCheck()
  }

  /**
   * @method _toggleWeek
   * Toggles the class that actives the week forecast slide in
   */
  _toggleWeek() {
    this._weekSection.classList.toggle("week__forecast--active");
  }

  /**
   * @method _weekOpen
   * Listens on the 'week' button on the main UI for the click to active the '_toggleWeek' method.
   */
  _weekOpen() {
    this._weekBtn.addEventListener("click", this._toggleWeek.bind(this));
    console.log("open");
  }

  /**
   * @method _weekOpen
   * Listens on the exit icon button in the week UI for the click to active the '_toggleWeek' method.
   */
  _weekClose() {
    this._closeBtn.addEventListener("click", this._toggleWeek.bind(this));
    console.log("close");
  }

  /**
   *
   * @param {function} handler
   * The 'nextWeekForecase' in the 'home' module is the handler
   * that is called when the 'click' event on the 'week' button
   * is triggered, which renders the week forecast data.
   * @method addWeekHandler
   * Is attached to the weekView class and called in the 'home' module.
   */
  addWeekHandler(handler) {
    this._weekBtn.addEventListener("click", handler);
  }

  /**
   * @method backgroundsData
   * formats the weather type & description
   * so a dynamic image can be generated for the
   * week forecast UI.
   */
  backgroundsData() {
    const { description: weatherDescript, main: type } =
      this._data[0].weather[0];
    this.dynamicBackgrounds(type, weatherDescript);
  }

  /**
   * @method _generateMarkup
   * Contains markup specific to the week UI
   * @returns {string}
   * A markup which has been updated with relevent data
   * and ready to be rendered to the week UI by the 'render' method.  
   */
  _generateMarkup() {
    return this._data
      .map((day) => {
        return `
      <div class="week__box">
            <p class="week__day">${this.gettingDate(day.dt)[0].slice(0, -1)}</p>
            <div class="week__icon--wrap">
              <img class="week__icon" src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png" alt="">
            </div>
            <p class="week__date">${this.formatOrdinalDate(
              this.gettingDate(day.dt)[1]
            )} ${this.gettingDate(day.dt)[2]}</p>
            <p class="week__temp">${Math.round(day.temp.max)}°C</p>
            <p class="week__weather">${this.uppserCaseDescription(
              day.weather[0].description
            )}</p>
          </div>`;
      })
      .join("");
  }
}

export default new WeekView();
