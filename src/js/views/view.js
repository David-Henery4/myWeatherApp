//             MAIN VIEW CLASS
import icons from "url:../../images/Spinner-icon.svg"
import * as config from "../config.js";

export default class View {
  _data;
  // _errorCheck;
  _generalOverlayEle = document.querySelector(".hours__overlay");
  _errMsgContainer = document.querySelector(".error__msg--wrap");
  _errMsgtext = document.querySelector(".error__msg--text");
  _errExitIcon = document.querySelector(".exit__icon--errmsg");

  constructor() {
    // super();
    this.exitErrorMsg();
  }

  overlay() {
    this._generalOverlayEle.classList.toggle("hours__overlay--active");
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
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

  gettingDate(uni) {
    const date = new Date(uni * 1000);
    // console.log(date);
    const local = navigator.language;
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const dateSplit = new Intl.DateTimeFormat(local, options)
      .format(date)
      .split(" ");
    // console.log(dateSplit);
    return dateSplit;
  }

  uppserCaseDescription(descrip) {
    const str = descrip.split(" ");
    const finalDescrip = str
      .map((word) => {
        const upper = word[0].toUpperCase();
        return upper.concat(word.slice(1));
      })
      .join(" ");
    return finalDescrip;
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  // random backgrounds
  randomBackgrounds(imageArray) {
    const image = imageArray[Math.floor(Math.random() * imageArray.length)];
    return image;
  }

  dynamicBackgrounds(type,description) {
    console.log("dynamicBackgrounds background active");
    // console.log(this._data.weathType);
    // console.log(this._data.WeathDescript);
    // Snowy Weather Background
    if (type === "Snow") {
      const snow = this.randomBackgrounds(config.BACKGROUNDSNOW__DAY);
      this.generateBackground(snow);
    }

    // Cloudy Weather Background
    if (type === "Clouds") {
      const randomClouds = this.randomBackgrounds(config.BACKGROUNDCLOUDY__DAY);
      this.generateBackground(randomClouds);
    }

    // Partial Cloudy Weather
    if (
      description === "scattered clouds" ||
      description === "few clouds"
    ) {
      const randomPartialClouds = this.randomBackgrounds(
        config.BACKGROUNDPARTCLOUDY__DAY
      );
      this.generateBackground(randomPartialClouds);
    }

    // Raining Weather Background
    if (type === "Rain" || type === "Drizzle") {
      const randomRain = this.randomBackgrounds(config.BACKGROUNDRAIN__DAY);
      this.generateBackground(randomRain);
    }

    // Sunny Weather Background
    if (type === "Clear") {
      const randomSunny = this.randomBackgrounds(config.BACKGROUNDSUN__DAY);
      this.generateBackground(randomSunny);
    }

    // ThunderStorm Weather BackGround
    if (type === "Thunderstorm") {
      const randomLightning = this.randomBackgrounds(
        config.BACKGROUNDLIGHTN__DAY
      );
      this.generateBackground(randomLightning);
    }

    // Foggy Weather Background
    if (
      type === "Fog" ||
      type === "Haze" ||
      type === "Mist"
    ) {
      const randomFog = this.randomBackgrounds(config.BACKGROUNDFOG__DAY);
      this.generateBackground(randomFog);
    }

    // Smokey Weather Background
    if (type === "Smoke") {
      const randomSmoke = this.randomBackgrounds(config.SMOKEY__DAY);
      this.generateBackground(randomSmoke);
    }

    // Tornado weather background
    if (type === "Tornado") {
      const tornado = this.randomBackgrounds(config.TORNADO__DAY);
      this.generateBackground(tornado);
    }

    // Ash weather background
    if (type === "Ash") {
      const ash = this.randomBackgrounds(config.ASH__DAY);
      this.generateBackground(ash);
    }

    // Squall, dust & sandstorms weather background
    if (
      type === "Squall" ||
      type === "Dust" ||
      type === "Sand"
    ) {
      const squallDustSand = this.randomBackgrounds(config.DUSTSTORM__DAY);
      this.generateBackground(squallDustSand);
    }
  }

  generateBackground(image) {
    console.log("generate background active");
    console.log(this._backgroundElement);
    this._backgroundElement.style.backgroundImage = `url(${image})`;
  }

  // ERROR METHODS
  _removeExitIcon() {
    this._errMsgContainer.classList.remove("error__msg--active");
  }
  renderErrorMsg(message = this._errorMessage) {
    const errorMarkup = `<p>${message}</p>`;
    this._errMsgtext.innerHTML = "";
    this._errMsgtext.insertAdjacentHTML("afterbegin", errorMarkup);
    this._errMsgContainer.classList.add("error__msg--active");
  }
  exitErrorMsg() {
    this._errExitIcon.addEventListener(
      "click",
      this._removeExitIcon.bind(this)
    );
  }
}
