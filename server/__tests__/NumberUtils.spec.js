const NumberUtils = require("../dataIn/NumberUtils");

describe("isEven", () => {
  test("is even", () => {
    expect(NumberUtils.isEven(10)).toBeTruthy();
  });
  test("is not even", () => {
    expect(NumberUtils.isEven(7)).toBeFalsy();
  });
});
