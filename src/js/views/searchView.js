import View from "./view.js";
import * as model from "../model";
//
console.log("Search View Working");
//

/**
 * @class 'Search' contains everything to do with the search menu UI (inherits from the 'View' parent)
 */
class Search extends View {
  _searchContainer = document.querySelector(".search__page--wrap");
  _inputForm = document.querySelector(".search__location--sect");
  _searchInput = document.querySelector(".search__location--input");
  _getCurrentWeathBtn = document.querySelector(".current__weath--btn");
  _searchBtn = document.querySelector(".search__icon");
  _errorMessage = `There has been a problem with your search query. Please try another.`;

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

  /**
   * @method _searchIconEvent
   * Actives search menu when clicking on the search icon
   */
  _searchIconEvent() {
    this._searchBtn.addEventListener(
      "click",
      this._searchIconAction.bind(this)
    );
  }

  /**
   * @method getQuery
   * Takes users search query and saves it to variable 
   * @returns {string}
   * Returns users search query to be used in the 'home' module
   */
  getQuery() {
    const query = this._searchInput.value;
    this._searchInput.value = "";
    this._searchInput.blur();
    return query;
  }

  _submitActions(e) {
    e.preventDefault();
      this._searchContainer.classList.add("page__remove");
      this.overlay();
  }

  /**
   * @method _submitEvent
   * Listens for the submit Event to activate styles.
   * @method this._submitActions
   * calls this method on input submit to remove styles for the starter menu. (Have to use bind because 'this' is automatically becomes the element the eventListner is attached to otherwise)
   */
  _submitEvent() {
    this._inputForm.addEventListener("submit", this._submitActions.bind(this));
  }

  _clickActions() {
      this._searchContainer.classList.add("page__remove");
      this.overlay();
  }

  /**
   * 
   * @param {function} handler
   * Calls 'currentWeather' function in the 'home' module when the 'get current weather' button is clicked.
   * @method _clickActions
   * Calls this method to remove the styles for the start menu.  
   */
  currentViewHandlerAndClickEvent(handler) {
    this._getCurrentWeathBtn.addEventListener(
      "click",
      this._clickActions.bind(this)
    );
    this._getCurrentWeathBtn.addEventListener("click", handler);
  }

  /**
   * 
   * @param {function} handler
   * Handler is 'searchPage' function in 'home' module that gets called on user input submit 
   */
  searchHandler(handler) {
    this._inputForm.addEventListener("submit", handler);
  }
}

export default new Search();
