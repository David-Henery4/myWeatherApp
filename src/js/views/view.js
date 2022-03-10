//             MAIN VIEW CLASS
import icons from "url:../../images/Spinner-icon.svg"
import * as config from "../config.js";

/**
 * @class 'View' is the parent class for the view classes.  
 * It also contains re-useable methods than can be used by all view classes. 
 */
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

  /**
   * @method overlay
   * re-usable method that enables a overlay over the current weather UI
   */
  overlay() {
    this._generalOverlayEle.classList.toggle("hours__overlay--active");
  }

  /**
   * @method render
   * Is the most important method in the Project
   * @param {object} data data that is entered is specific to the class that the method is called on and stores it in the '_data' property to be used.
   * @method this._generateMarkup
   * This method contains the markup to be rendered that is specific to the class the 'render' method is called on.
   * This markup is rendered to the 'this._parentElement' which is also specific to the class the 'render' method is called on.
   */
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Method can be re-used by the multiple views
   * @param {number} d
   * Takes number of the date (E.g - 4) and makes it ordinal (E.g - 4th)
   * @returns
   * Formated number of the date.
   */
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

  /**
   *
   * @param {number} uni
   * Takes unix time and converts to timestamp.
   * This timestamp is then used to format the date
   * from 'Intl.DateTimeFormat' constructor.
   * @returns {Array}
   * Returns the formated date (E.g 'Thursday', 4, 'October')
   */
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

  /**
   *
   * @param {string} descrip
   * Passes in a string that uppercases every word.
   * @returns {string}
   * Final string ready to be used
   */
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

  /**
   * @method clear
   * Clears an elements html to make way for new html content.
   */
  clear() {
    this._parentElement.innerHTML = "";
  }

  // random backgrounds
  /**
   * Random Background image generator
   * @param {array} imageArray
   * Takes in a array of image sources
   * @returns {string}
   * Returns a random url source from the array
   */
  randomBackgrounds(imageArray) {
    const image = imageArray[Math.floor(Math.random() * imageArray.length)];
    return image;
  }

  /**
   * Method selects a specific array to choose to take a image from
   * based on the current weather type or description.
   * @param {string} type
   * weather type
   * @param {string} description
   * weather description
   * @returns {string}
   * A random image is then selected from the choosen array
   * and inputed in to 'generateBackground' method.
   */
  dynamicBackgrounds(type, description) {
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
    if (description === "scattered clouds" || description === "few clouds") {
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
    if (type === "Fog" || type === "Haze" || type === "Mist") {
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
    if (type === "Squall" || type === "Dust" || type === "Sand") {
      const squallDustSand = this.randomBackgrounds(config.DUSTSTORM__DAY);
      this.generateBackground(squallDustSand);
    }
  }

  /**
   * @method generateBackground
   * Applies a background image to the '_backgroundElement'.
   * 
   * The '_backgroundElement' is specific to the class 
   * that the method is called on.
   * @param {string} image
   * takes in image source
   */
  generateBackground(image) {
    console.log("generate background active");
    console.log(this._backgroundElement);
    this._backgroundElement.style.backgroundImage = `url(${image})`;
  }

  // ERROR METHODS
  /**
   * @method _removeExitIcon
   * Removes the error message style class
   */
  _removeExitIcon() {
    this._errMsgContainer.classList.remove("error__msg--active");
  }

  /**
   * Takes in a error message that is specific to the class it is called on. (The classes show different messages based on their error)
   * @param {string} message 
   * The message is rendered to the markup for the error UI.
   */
  renderErrorMsg(message = this._errorMessage) {
    const errorMarkup = `<p>${message}</p>`;
    this._errMsgtext.innerHTML = "";
    this._errMsgtext.insertAdjacentHTML("afterbegin", errorMarkup);
    this._errMsgContainer.classList.add("error__msg--active");
  }
  /**
   * @method exitErrorMsg
   * Listens for click on the exit icon in 
   * the error message UI and then activates the
   * '_removeExitIcon' method to remove the styles
   */
  exitErrorMsg() {
    this._errExitIcon.addEventListener(
      "click",
      this._removeExitIcon.bind(this)
    );
  }
}
