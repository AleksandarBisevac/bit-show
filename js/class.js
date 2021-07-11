class Program {
  constructor() {
    this.showList = new Array();
  }
  addShow(item) {
    if (item instanceof Show) this.showList.push(item);
  }
  sortShows() {
    let sorted = [];
    sorted = this.showList.sort((a, b) => b.rating - a.rating);
    return sorted;
  }
  getTop50() {
    let top50 = [];
    let sortedCopy = [...this.sortShows()];
    for (let i = 0; i < 50; i++) {
      top50.push(sortedCopy.shift());
    }
    return top50;
  }
}

class Show {
  constructor(id, name, rating, image, summary, premiered, site, genre) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.genre = genre;
    this.image = image;
    this.summary = summary;
    this.premiered = premiered;
    this.officialSite = site;
  }
}
