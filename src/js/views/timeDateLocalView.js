import View from "./view.js";
// import searchIcon from "url:../../images/search-icon.svg";

class TimeDateLocal extends View {
  _parentElement = document.querySelector(".location__wrap");
  _dateTimeElement = document.querySelector(".date--time");
  // _searchBtn = document.querySelector(".search__icon");

  constructor() {
    super();
    this.getCurrentDateTime();
    // this._searchMethod();
  }

  // _searchMethod() {
  //   this._dateTimeElement.addEventListener("click", function (e) {
  //     if (!e.target.closest(".search__icon")) return;
  //     console.log(e.target);
  //   });
  // }

  _generateMarkup() {
    return `
          <h4>${this._data.locationName}</h4>`;
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
      const fullDate = `${this.formatOrdinalDate(dayOFMonth)} ${monthName}`;
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
      <h4>${time}</h4>`
    );
  }
}

export default new TimeDateLocal();
