const Calculator = require("../dataIn/Calculator");

describe("divide", () => {
  test("0 is exception", () => {
    expect(() => {
      Calculator.divide(1, 0);
    }).toThrow("y is zero");
  });
});
