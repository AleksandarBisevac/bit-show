import Show from "./show.js";

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

export default Program;
