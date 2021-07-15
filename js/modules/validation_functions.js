/************************************************************
                      VALIDATION FUNCTIONS
************************************************************/

export const validateNumber = (num) => {
  if (num && isFinite(num)) {
    return num;
  } else {
    return null;
  }
};

export const validateString = (string) => {
  if (string !== "" && typeof string === "string") {
    return string;
  } else {
    return null;
  }
};

export const validateObjWebsite = (string) => {
  if (
    string !== "" &&
    typeof string === "string" &&
    string.slice(0, 4) === "http"
  ) {
    return string;
  } else {
    return null;
  }
};

export const validateImage = (string) => {
  if (string !== "" && typeof string === "string") {
    return string;
  } else {
    return null;
  }
};

export const validateDate = (string) => {
  let date = new Date(string);
  if (date !== undefined && date != "Invalid Date") {
    return date;
  } else {
    return null;
  }
};

export const validateGenre = (array) => {
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

export const dateFormat = (date) => {
  let dateFormat = new Date(date);
  return `${dateFormat.getDate()}.${
    dateFormat.getMonth() + 1
  }.${dateFormat.getFullYear()}`;
};
