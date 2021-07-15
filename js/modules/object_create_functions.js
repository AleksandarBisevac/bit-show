/************************************************************
                      OBJ CREATE FUNCTIONS
************************************************************/
import Program from "./program.js";
import Show from "./show.js";
import {
  validateDate,
  validateString,
  validateNumber,
  validateImage,
  validateObjWebsite,
  validateGenre,
} from "./validation_functions.js";
/***
PROGRAM CREATE
***/
export const createProgram = () => {
  const program = new Program();
  return program;
};

/***
SHOW CREATE
***/

export const createShow = (
  id,
  name,
  rating,
  image,
  summary,
  premiered,
  site,
  genre
) => {
  const showId = (function () {
    if (validateNumber(id) !== null) {
      return id;
    }
  })();
  const showName = (function () {
    if (validateString(name) !== null) {
      return name;
    } else {
      return "Show title TBA";
    }
  })();
  const showRate = (function () {
    if (validateNumber(rating) !== null) {
      return rating;
    } else {
      return "Show title TBA";
    }
  })();
  const showImg = (function () {
    if (validateImage(image) !== null) {
      return image;
    } else {
      return "../../images/007.jpg";
    }
  })();
  const showSumm = (function () {
    if (validateString(summary) !== null) {
      return summary;
    } else {
      return "<p>More info about the show will be desplayed soon!</p>";
    }
  })();
  const showPremier = (function () {
    if (validateDate(premiered) !== null) {
      return premiered;
    } else {
      return "TBA";
    }
  })();
  const showWeb = (function () {
    if (validateObjWebsite(site) !== null) {
      return site;
    } else {
      return "#";
    }
  })();
  const showGenres = validateGenre(genre);

  // show invocation

  const show = new Show(
    showId,
    showName,
    showRate,
    showImg,
    showSumm,
    showPremier,
    showWeb,
    showGenres
  );
  return show;
};
