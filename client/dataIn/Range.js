module.exports = class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  contains(value) {
    return this.min <= value && value <= this.max;
  }
};
