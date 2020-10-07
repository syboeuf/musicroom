const MultiLineString = require("../dataIn/MultiLineString");

describe("MultiLineString", () => {
  test("MultiLineString test", () => {
    const expected = "Hello\nWorld\nHello\nWorld\nHello\nWorld\n";
    expect(
      MultiLineString.join("Hello", "World", "Hello", "World", "Hello", "World")
    ).toEqual(expected);
  });
  test("MultiLineString snapshot test", () => {
    expect(
      MultiLineString.join("Hello", "World", "Hello", "World", "Hello", "World")
    ).toMatchSnapshot();
  });
});
