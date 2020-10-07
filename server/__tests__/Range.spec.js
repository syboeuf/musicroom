const Range = require("../dataIn/Range");

describe("Range dynamically", () => {
  let sut = null;
  beforeEach(() => {
    sut = new Range(0.0, 10.5);
  });

  const tests = [
    { args: -0.1, expected: false },
    { args: 0.0, expected: true },
    { args: 10.5, expected: true },
    { args: 10.6, expected: false }
  ];

  tests.forEach(tst => {
    test(`${tst.args} is ${tst.expected}`, () => {
      expect(sut.contains(tst.args)).toBe(tst.expected);
    });
  });
});
