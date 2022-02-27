import View from "./view.js";
import searchIcon from "url:../../images/search-icon.svg";

class TimeDateLocal extends View {
  _parentElement = document.querySelector(".location__wrap");
  _dateTimeElement = document.querySelector(".date--time");

  constructor() {
    super();
    this.getCurrentDateTime();
  }

  // timeDateLocalHandler(handler) {
  //   window.addEventListener("load", handler);
  // }

  _generateMarkup() {
    return `
          <h4>${this._data.locationName}</h4>`;
  }

  _formatOrdinalDate(d) {
    return (
      d +
      (31 == d || 21 == d || 1 == d
        ? "st"
        : 22 == d || 2 == d
        ? "nd"
        : 23 == d || 3 == d
        ? "rd"
        : "th")
    );
  }

  getCurrentDateTime() {
    // const month = date.getMonth() + 1;
    // timer to get current time
    setInterval(() => {
      const date = new Date();
      const dayOFMonth = date.getDate();
      const hour = date.getHours().toString().padStart(2, 0);
      const mins = date.getMinutes().toString().padStart(2, 0);
      const monthName = date.toDateString().split(" ")[1];
      const fullDate = `${this._formatOrdinalDate(dayOFMonth)} ${monthName}`;
      const time = `${hour}:${mins}`;
      this._generateCurrentDateTime(time, fullDate);
    }, 1000);
  }

  _generateCurrentDateTime(time, date) {
    // Might have to remove icon somewhere else because of the refresh (will need event delegation if kept!)
    this._dateTimeElement.innerHTML = "";
    this._dateTimeElement.insertAdjacentHTML(
      "afterbegin",
      `<p>${date}</p>
      <h4>${time}</h4>
      <img src="${searchIcon}" alt="">`
    );
  }
}

export default new TimeDateLocal();
