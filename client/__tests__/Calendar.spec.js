const MonthlyCalendar = require("../dataIn/MonthlyCalendar");

describe("MonthlyCalendar", () => {
  test("2012/1/31 is 0", () => {
    const sut = new MonthlyCalendar(new Date("2012-01-31"));
    expect(sut.getRemainingDays()).toBe(0);
  });
  test("2012/1/30 is 1", () => {
    const sut = new MonthlyCalendar(new Date("2012-01-30"));
    expect(sut.getRemainingDays()).toBe(1);
  });
  test("2012/2/1 is 29", () => {
    const sut = new MonthlyCalendar(new Date("2012-02-01"));
    expect(sut.getRemainingDays()).toBe(28);
  });
});
