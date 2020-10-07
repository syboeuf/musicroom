module.exports = class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count += 1;
    return this.count;
  }
};
