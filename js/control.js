/************************************************************
                     VALIDATION FUNCTIONS 
 ************************************************************/
validateNumber = (num) => {
  if (num && isFinite(num)) {
    return num;
  }
};

validateString = (string) => {
  if (string !== "" && typeof string === "string") {
    return string;
  } else {
    return "";
  }
};

validateObjWebsite = (string) => {
  if (
    string !== "" &&
    typeof string === "string" &&
    string.slice(0, 4) === "http"
  ) {
    return string;
  } else {
    return "#";
  }
};

validateImage = (string) => {
  if (string !== "" && typeof string === "string") {
    return string;
  } else {
    return "../images/007.jpg";
  }
};

validateDate = (string) => {
  let date = new Date(string);
  if (date !== undefined && date != "Invalid Date") {
    return date;
  } else {
    return undefined;
  }
};

validateGenre = (array) => {
  let inputArr = [...array];
  let genres = [
    "Action",
    "Adult",
    "Adventure",
    "Anime",
    "Children",
    "Comedy",
    "Crime",
    "DIY",
    "Drama",
    "Espionage",
    "Family",
    "Fantasy",
    "Food",
    "History",
    "Horror",
    "Legal",
    "Medical",
    "Music",
    "Mystery",
    "Nature",
    "Romance",
    "Science-Fiction",
    "Sports",
    "Supernatural",
    "Thriller",
    "Travel",
    "Western",
  ];
  let resultArr = inputArr.filter((element) => {
    return genres.includes(element);
  });
  if (resultArr.length !== 0) {
    return resultArr;
  } else {
    return ["Other"];
  }
};

function dateFormat(date) {
  let dateFormat = new Date(date);
  return `${dateFormat.getDate()}.${
    dateFormat.getMonth() + 1
  }.${dateFormat.getFullYear()}`;
}

/************************************************************
                                           OBJ CREATE FUNCTIONS
                       ************************************************************/

function createProgram() {
  const program = new Program();
  return program;
}

function createShow(id, name, rating, image, summary, premiered, site, genre) {
  showId = validateNumber(id);
  showName = validateString(name);
  showRate = validateNumber(rating);
  showImg = validateImage(image);
  showSumm = validateString(summary);
  showPremier = validateDate(premiered);
  showWeb = validateObjWebsite(site);
  showGenres = validateGenre(genre);

  if (
    [
      showId,
      showName,
      showRate,
      showImg,
      showSumm,
      showPremier,
      showWeb,
      showGenres,
    ].indexOf(undefined) === -1
  ) {
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
  }
}

// const showObj = createShow(
//   1,
//   "Test",
//   9.3,
//   "ulr",
//   "Neki tekst ovde",
//   "2020-03-25",
//   "http:test",
//   ["Drama", "Action", "Anime", "Test"]
// );

// console.log(showObj);

/************************************************************
                                           HELPER FUNCTIONS
                       ************************************************************/
function compareStrings(strInp, strDB) {
  let inputString = strInp.toUpperCase().split(" "); //reči u input stringu
  let compareString = strDB.toUpperCase().split(" "); //reči u stringu iz baze
  let compareChar = strDB.toUpperCase().split(""); //karakteri u stringu
  let inputChar = strInp.toUpperCase().split(""); //karakteri u input stringu
  if (strInp.toUpperCase() === strDB.toUpperCase()) {
    return 100;
  }
  /*
                        KOMPARACIJA REČI  - kao elemenata nizova iz originalnih stringova
                        */
  let countWord = 0;
  compareString.forEach((element) => {
    inputString.forEach((el) => {
      if (element.search(el) !== -1 && element !== " ") {
        countWord++;
      }
    });
  });
  /*
                      KOMPARACIJA unetih strignova kao dela mogućeg stringa
                      */
  let countParts = 0;
  compareString.forEach((element) => {
    inputString.forEach((el) => {
      if (element.includes(el) !== -1 && element !== " ") {
        countParts++;
      }
    });
  });
  /*
                      KOMPARACIJA KARAKTERA - ukupnih karaktera jednog i drugog stringa
                      */
  let result = compareChar.filter((element) => {
    return inputChar.includes(element);
  });
  // console.log("countWord: " + countWord);
  // console.log("countParts: " + countParts);
  // console.log("result.length:" + result.length);
  return countWord * 2.5 + countParts * 0.35 + result.length * 0.01;
}
/***********************************************************
                                            PRETRAŽIVANJE
                      ***********************************************************/
function searchShow(showArr, inpVal, f) {
  showArr.forEach((element) => {
    element.searchVal = f(inpVal, element.name);
  });
  let sortProgramArr = showArr.sort((a, b) => b.searchVal - a.searchVal);
  let top5 = sortProgramArr.slice(0, 5);
  return top5;
}
