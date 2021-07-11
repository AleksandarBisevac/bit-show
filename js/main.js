let input = document.querySelector("#search");
let showWrapper = document.querySelector(".show-wrapper");
let localStorage = window.localStorage;
let resultUl = document.querySelector("#result");
let showReq = new XMLHttpRequest();
let inputValue;

const program = createProgram();

showReq.open("GET", `http://api.tvmaze.com/shows`);
showReq.onload = () => {
  if (showReq.status === 200) {
    inputValue = input.value;
    let response = showReq.responseText;
    allShows = JSON.parse(response);
    console.log(allShows);
    allShows.forEach((element) => {
      //id, name, rating, image, summary, premiered, site, genre
      const show = createShow(
        element.id,
        element.name,
        element.rating.average,
        element.image.original,
        element.summery,
        element.premiered,
        element.officialSite,
        element.genres
      );
      program.addShow(show);
    });
    /*
    ispisivanje top 50 serija 
    */
    program.getTop50().forEach((element) => {
      let resultTop50 = document.createElement("div");
      resultTop50.classList.add("result-top-50");
      resultTop50.innerHTML = `
      <div data-key="${element.id}" class="img-handler">
        <img src="${element.image}" alt="show poster">
      </div>
      <h3>${element.name}</h3>
      `;
      showWrapper.appendChild(resultTop50);
    });
    /*
    selektovanje serije za više info
    */
    let list50 = document.querySelectorAll("div[data-key]");
    list50.forEach((element) => {
      element.addEventListener("click", function (e) {
        let key = this.getAttribute("data-key");
        localStorage.setItem("id", key);
        document.location = "show.html";
      });
    });
    /*
     pretraživanje filmova 
     */
    input.addEventListener("keyup", () => {
      if (input.value !== "") {
        resultUl.innerHTML = "";
        resultUl.classList.add("show");
        console.log(program.showList);
        let top5 = searchShow(program.showList, input.value, compareStrings);
        top5.forEach((element) => {
          let resultLi = document.createElement("li");
          resultLi.textContent = element.name;
          resultLi.setAttribute("data-key", element.id);
          resultUl.appendChild(resultLi);
          resultLi.addEventListener("click", () => {
            let key = resultLi.getAttribute("data-key");
            localStorage.setItem("id", key);
            document.location = "show.html";
          });
        });
      } else {
        resultUl.classList.remove("show");
      }
    });
  }
};
showReq.send();
