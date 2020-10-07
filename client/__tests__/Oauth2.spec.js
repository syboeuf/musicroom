const ConsumptionTax = require("../dataIn/ConsumptionTax");

describe("ConsumptionTax dynamically", () => {
  const tests = [
    { taxRate: 5, price: 100, expected: 105 },
    { taxRate: 5, price: 3000, expected: 3150 },
    { taxRate: 10, price: 50, expected: 55 },
    { taxRate: 5, price: 50, expected: 52 },
    { taxRate: 3, price: 50, expected: 51 }
  ];

  tests.forEach(tst => {
    test(`${tst.price} is ${
      tst.expected
    } in consumption tax. If the tax rate of ${tst.taxRate}%`, () => {
      const sut = new ConsumptionTax(tst.taxRate);
      expect(sut.apply(tst.price)).toBe(tst.expected);
    });
  });
});
