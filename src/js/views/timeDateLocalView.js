import View from "./view.js";
// import searchIcon from "url:../../images/search-icon.svg";

/**
 * @class 'TimeDateLocal' contain everything to do with the time, date in the current UI. (inherits from the 'View' parent)
 */
class TimeDateLocal extends View {
  _parentElement = document.querySelector(".location__wrap");
  _dateTimeElement = document.querySelector(".date--time");

  constructor() {
    super();
    this.getCurrentDateTime();
  }

  /**
   * @method _generateMarkup location mark up is applied to the current weather UI by the inherited 'render' method
   * @returns {string}
   * Returns mark up specific to this view (Uses data stored from the render method)
   */
  _generateMarkup() {
    return `
          <h4>${this._data.locationName}</h4>`;
  }

  /**
   * @method getCurrentDateTime
   * gets current date & time and formats it to the '_generateCurrentDateTime' to be renderd to the current weather UI
   */
  getCurrentDateTime() {
    // timer to get current time
    setInterval(() => {
      const date = new Date();
      const dayMonth = this.gettingDate(Math.round(date.getTime() / 1000));
      const dayOFMonth = dayMonth[1];
      const monthName = dayMonth[2];
      const hour = date.getHours().toString().padStart(2, 0);
      const mins = date.getMinutes().toString().padStart(2, 0);
      const fullDate = `${this.formatOrdinalDate(dayOFMonth)} ${monthName}`;
      const time = `${hour}:${mins}`;
      this._generateCurrentDateTime(time, fullDate);
    }, 1000);
  }

  /**
   * @method _generateCurrentDateTime
   * Takes time & date string and applies it to the current weather UI.
   * @param {string} time 
   * @param {string} date 
   */
  _generateCurrentDateTime(time, date) {
    this._dateTimeElement.innerHTML = "";
    this._dateTimeElement.insertAdjacentHTML(
      "afterbegin",
      `<p>${date}</p>
      <h4>${time}</h4>`
    );
  }
}

export default new TimeDateLocal();
