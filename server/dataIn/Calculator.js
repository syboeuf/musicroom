module.exports = class Calculator {
  static divide(x, y) {
    if (y === 0) {
      throw new Error("y is zero");
    }
    return x / y;
  }
};
