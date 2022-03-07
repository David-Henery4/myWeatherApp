import View from "./view.js";
import * as model from "../model";
//
console.log("Search View Working");
//

class Search extends View {
  _searchContainer = document.querySelector(".search__page--wrap");
  _inputForm = document.querySelector(".search__location--sect");
  _searchInput = document.querySelector(".search__location--input");
  _getCurrentWeathBtn = document.querySelector(".current__weath--btn");
  _searchBtn = document.querySelector(".search__icon");
  _errorMessage = `There has been a problem with your search query. Please try another.`;
  // _errorCheck = document.querySelector(".error__msg--active");

  constructor() {
    super();
    this._submitEvent();
    this._searchIconEvent();
  }

  _searchIconAction() {
    this._searchContainer.classList.remove("page__remove");
    this.overlay();
    console.log(this._searchBtn);
  }

  _searchIconEvent() {
    this._searchBtn.addEventListener(
      "click",
      this._searchIconAction.bind(this)
    );
  }

  getQuery() {
    const query = this._searchInput.value;
    this._searchInput.value = "";
    this._searchInput.blur();
    return query;
  }

  // Search Locations Query Actions
  _submitActions(e) {
    e.preventDefault();
    // if (this._errorCheck === false){
    // }
      this._searchContainer.classList.add("page__remove");
      this.overlay();
  }
  _submitEvent() {
    this._inputForm.addEventListener("submit", this._submitActions.bind(this));
  }

  // Current Location Button Actions
  _clickActions() {
    // if (this._errorCheck === false){
    // }
      this._searchContainer.classList.add("page__remove");
      this.overlay();
  }
  currentViewHandlerAndClickEvent(handler) {
    this._getCurrentWeathBtn.addEventListener(
      "click",
      this._clickActions.bind(this)
    );
    this._getCurrentWeathBtn.addEventListener("click", handler);
  }

  // currentViewHandler(handler) {
  //   this._getCurrentWeathBtn.addEventListener("click", handler);
  // }

  searchHandler(handler) {
    this._inputForm.addEventListener("submit", handler);
  }
}

export default new Search();
