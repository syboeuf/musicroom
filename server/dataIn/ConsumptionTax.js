module.exports = class ConsumptionTax {
  constructor(rate) {
    this.rate = rate;
  }

  apply(price) {
    return Math.floor(price + (price * this.rate) / 100);
  }
};
