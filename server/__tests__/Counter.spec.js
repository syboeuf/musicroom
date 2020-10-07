const Counter = require("../dataIn/Counter");

describe("increment", () => {
  test("get 1 at initial", () => {
    const c = new Counter();
    expect(c.increment()).toBe(1);
  });
  test("get 2 at run increment method", () => {
    const c = new Counter();
    c.increment();
    expect(c.increment()).toBe(2);
  });
  test("get 51 at run increment method 50 times", () => {
    const c = new Counter();
    for (let i = 0; i < 50; i++) {
      c.increment();
    }
    expect(c.increment()).toBe(51);
  });
});
