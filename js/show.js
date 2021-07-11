let showId = localStorage.getItem("id");
let showNameH2 = document.querySelector("#showName");
let showImg = document.querySelector(".img-handler");
let showInfoDiv = document.querySelector(".info");
let showSeasonsUl = document.querySelector(".seasons");
let showSeasonsH3 = document.querySelector(".seasons h3");
let showCastUl = document.querySelector(".cast");
let showCastH3 = document.querySelector(".cast h3");
let showDetails = document.querySelector(".details");
let input = document.querySelector("#search");
let resultUl = document.querySelector("#result");
let inputValue;
showReq = new XMLHttpRequest();
showReq.open("GET", `https://api.tvmaze.com/shows/${showId}`);
showReq.onload = () => {
  if (showReq.status === 200) {
    let showReqResponse = showReq.responseText;
    let showObj = JSON.parse(showReqResponse);
    console.log(showObj);
    /*
     * Ispisivanje imena i slike serije
     */
    showNameH2.textContent = `${showObj.name}`;
    showImg.innerHTML = `
    <img src="${showObj.image.original}" alt="${showObj.name} image">
    `;
    showDetails.innerHTML = `<h3>Show Details</h3>${showObj.summary}`;
    let seasonsReq = new XMLHttpRequest();
    seasonsReq.open(
      "GET",
      `https://api.tvmaze.com/shows/${showObj.id}/seasons`
    );
    seasonsReq.onload = () => {
      if (seasonsReq.status === 200) {
        let seasonsReqResponse = seasonsReq.responseText;
        let seasonsObj = JSON.parse(seasonsReqResponse);
        console.log(seasonsObj);
        showSeasonsH3.textContent = `Seasons (${seasonsObj.length})`;
        seasonsObj.forEach((element) => {
          let seasonLi = document.createElement("li");
          if (element.premiereDate != null && element.endDate != null) {
            seasonLi.textContent = `${dateFormat(
              element.premiereDate
            )} - ${dateFormat(element.endDate)}`;
            showSeasonsUl.appendChild(seasonLi);
          } else {
            seasonLi.textContent = `TBA - TBA`;
            showSeasonsUl.appendChild(seasonLi);
          }
        });
      }
    };
    seasonsReq.send();
    let castReq = new XMLHttpRequest();
    castReq.open("GET", `https://api.tvmaze.com/shows/${showObj.id}/cast`);
    castReq.onload = () => {
      if (castReq.status === 200) {
        let castReqResponse = castReq.responseText;
        let castObj = JSON.parse(castReqResponse);
        showCastH3.textContent = `Cast`;
        let counter = 0;
        castObj.forEach((element) => {
          if (counter < 10) {
            let castLi = document.createElement("li");
            castLi.textContent = `${element.person.name}`;
            showCastUl.appendChild(castLi);
          }
          counter++;
        });
      }
    };
    castReq.send();
  }
  /*
     pretraživanje filmova 
     */
  let searchReq = new XMLHttpRequest();

  input.addEventListener("keydown", () => {
    if (input.value !== "") {
      resultUl.classList.add("show");
      resultUl.innerHTML = "";
      searchReq.open(
        "GET",
        `https://api.tvmaze.com/search/shows?q=${input.value}`
      );
      searchReq.onload = () => {
        if (searchReq.status === 200) {
          let searchReqResponse = searchReq.responseText;
          let searchArr = JSON.parse(searchReqResponse);
          console.log(searchArr);
          searchArr.forEach((element) => {
            let resultLi = document.createElement("li");
            resultLi.textContent = element.show.name;
            resultLi.setAttribute("data-key", element.show.id);
            resultUl.appendChild(resultLi);
            resultLi.addEventListener("click", () => {
              let key = resultLi.getAttribute("data-key");
              localStorage.setItem("id", key);
              document.location = "show.html";
            });
          });
        }
      };
      searchReq.send();
    } else {
      resultUl.classList.remove("show");
    }
  });

  /*
   * Potreban je novi zahtev za prikazivanje sezona
   */
};
showReq.send();
