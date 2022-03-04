import View from "./view.js";
// import searchIcon from "url:../../images/search-icon.svg";

class TimeDateLocal extends View {
  _parentElement = document.querySelector(".location__wrap");
  _dateTimeElement = document.querySelector(".date--time");

  constructor() {
    super();
    this.getCurrentDateTime();
  }

  _generateMarkup() {
    return `
          <h4>${this._data.locationName}</h4>`;
  }

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
