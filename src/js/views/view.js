//             MAIN VIEW CLASS

export default class View {
  _data;

  render(data) {
  this._data = data
  const markup = this._generateMarkup()
  // console.log(this._data)
  // console.log(markup)
  this.clear()
  this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear(){
    this._parentElement.innerHTML = ""
  }
}
