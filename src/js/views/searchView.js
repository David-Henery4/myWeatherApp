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

  constructor() {
    super();
    this._submitEvent();
    this._clickEvent();
  }

  _submitActions(e) {
    e.preventDefault();
    // add value to state object
    // console.log(this._searchInput.value);
    model.overallWeathData2.userSearches = this._searchInput.value;
    this._searchInput.value = "";
    this._searchInput.blur();
    // console.log(model.overallWeathData2)
    // sort remove on click and submit
    this._searchContainer.classList.add("page__remove");
  }

  _submitEvent() {
    this._inputForm.addEventListener("submit", this._submitActions.bind(this));
  }

  _clickActions(){
    this._searchContainer.classList.add("page__remove");
  }

  _clickEvent(){
    this._getCurrentWeathBtn.addEventListener("click", this._clickActions.bind(this))
  }


  searchHandler(handler) {
    this._inputForm.addEventListener("submit", handler);
  }
}

export default new Search();
