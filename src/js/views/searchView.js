import View from "./view.js";
import * as model from "../model";
//
console.log("Search View Working")
//

class Search extends View {
  _inputForm = document.querySelector(".search__location--sect");
  _searchInput = document.querySelector(".search__location--input");
  
  constructor(){
      super()
      this._submitEvent()
  }

  _submitActions(e){
    e.preventDefault();
    // add value to state object
    // console.log(this._searchInput.value);
    model.overallWeathData2.userSearches = this._searchInput.value;
    this._searchInput.value = "";
    this._searchInput.blur();
    // console.log(model.overallWeathData2)
  }

  _submitEvent(){
    this._inputForm.addEventListener("submit", this._submitActions.bind(this));
  }

  searchHandler(handler){
    this._inputForm.addEventListener("submit", handler)
  }
}

export default new Search();