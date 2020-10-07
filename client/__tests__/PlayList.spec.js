const FizzBuzz = require("../dataIn/FizzBuzz");

describe("FizzBuzz", () => {
  test("FizzBuzz test", () => {
    const actual = FizzBuzz.createFizzBuzzList(16);
    expect(actual.length).toBe(16);
    expect(actual[0]).toBe("1");
    expect(actual[1]).toBe("2");
    expect(actual[2]).toBe("Fizz");
    expect(actual[3]).toBe("4");
    expect(actual[4]).toBe("Buzz");
    expect(actual[5]).toBe("Fizz");
    expect(actual[6]).toBe("7");
    expect(actual[7]).toBe("8");
    expect(actual[8]).toBe("Fizz");
    expect(actual[9]).toBe("Buzz");
    expect(actual[10]).toBe("11");
    expect(actual[11]).toBe("Fizz");
    expect(actual[12]).toBe("13");
    expect(actual[13]).toBe("14");
    expect(actual[14]).toBe("FizzBuzz");
    expect(actual[15]).toBe("16");
  });
  test("FizzBuzz test custom", () => {
    const expected = [
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz",
      "16"
    ];
    const actual = FizzBuzz.createFizzBuzzList(16);
    expect(actual.length).toBe(16);
    expect(actual).toEqual(expected);
  });
  test("FizzBuzz snapshot test", () => {
    const actual = FizzBuzz.createFizzBuzzList(16);
    expect(actual).toMatchSnapshot();
  });
});
