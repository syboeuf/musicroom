const { LogAnalyzer, LogLoader } = require("../dataIn/LogAnalyzer");

describe("LogAnalyzer", () => {
  test("load method throw exception", () => {
    const logLoader = new LogLoader();
    logLoader.load = jest.fn();
    logLoader.load.mockImplementation(() => {
      throw new Error("load exception");
    });
    const sut = new LogAnalyzer(logLoader);
    expect(() => {
      sut.analyze("test");
    }).toThrow("load exception");
  });
});
