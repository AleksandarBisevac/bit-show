/************************************************************
                        HELPER FUNCTIONS
************************************************************/

/****
STRING MATCH FUNCTION
****/
export const compareStrings = (strInp, strDB) => {
  let inputString = strInp.toUpperCase().split(" "); //reči u input stringu
  let compareString = strDB.toUpperCase().split(" "); //reči u stringu iz baze
  let compareChar = strDB.toUpperCase().split(""); //karakteri u stringu
  let inputChar = strInp.toUpperCase().split(""); //karakteri u input stringu
  if (strInp.toUpperCase() === strDB.toUpperCase()) {
    return 100;
  }

  // KOMPARACIJA REČI  - kao elemenata nizova iz originalnih stringova
  let countWord = 0;
  compareString.forEach((element) => {
    inputString.forEach((el) => {
      if (element.search(el) !== -1 && element !== " ") {
        countWord++;
      }
    });
  });
  // KOMPARACIJA unetih strignova kao dela mogućeg stringa

  let countParts = 0;
  compareString.forEach((element) => {
    inputString.forEach((el) => {
      if (element.includes(el) !== -1 && element !== " ") {
        countParts++;
      }
    });
  });
  // KOMPARACIJA KARAKTERA - ukupnih karaktera jednog i drugog stringa
  let result = compareChar.filter((element) => {
    return inputChar.includes(element);
  });
  // console.log("countWord: " + countWord);
  // console.log("countParts: " + countParts);
  // console.log("result.length:" + result.length);

  return countWord * 2.5 + countParts * 0.35 + result.length * 0.01;
};

/***
SEARCHING SHOWS
***/
export const searchShow = (showArr, inpVal, f) => {
  showArr.forEach((element) => {
    element.searchVal = f(inpVal, element.name);
  });
  let sortProgramArr = showArr.sort((a, b) => b.searchVal - a.searchVal);
  let top5 = sortProgramArr.slice(0, 5);
  return top5;
};
