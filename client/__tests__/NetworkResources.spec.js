const { NetworkResources, NetworkLoader } = require("../dataIn/NetworkResources");

describe("NetworkResources", () => {
  test("load test", () => {
    const expected = "Hello World";
    const loader = new NetworkLoader();
    loader.getInput = jest.fn();
    loader.getInput.mockReturnValue({
      read() {
        return expected;
      }
    });
    const sut = new NetworkResources(loader);
    expect(sut.load()).toBe(expected);
  });
});
