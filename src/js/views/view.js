//             MAIN VIEW CLASS

export default class View {
  _data;
  _generalOverlayEle = document.querySelector(".hours__overlay");

  overlay(){
    // if(this._searchContainer) return
      this._generalOverlayEle.classList.toggle("hours__overlay--active");
  }
  removeOverlay(){
  
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    // console.log(this._data)
    // console.log(markup)
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  formatOrdinalDate(d) {
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

  clear() {
    this._parentElement.innerHTML = "";
  }
}
