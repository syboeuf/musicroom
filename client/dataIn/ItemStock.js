module.exports = class ItemStock {
  constructor() {
    this.values = {};
  }

  getNum(item) {
    const itnm = item && item.name;
    return this.values[itnm] || 0;
  }

  add(item) {
    const itnm = item && item.name;
    let num = this.values[itnm] || 0;
    num += 1;
    this.values[itnm] = num;
  }
};
