const Authentication = require("../dataIn/Authentication");
const AccountDao = require("../dataIn/AccountDao");
const Account = require("../dataIn/Account");

jest.mock("../dataIn/AccountDao");

describe("Authentication", () => {
  test("not exist account", () => {
    const sut = new Authentication();
    const dao = new AccountDao();
    dao.findOrNull.mockReturnValue(null);
    sut.setDao(dao);
    expect(sut.authenticate("user001", "pw123")).toBeNull();
  });
  test("exist account and equal password", () => {
    const sut = new Authentication();
    const dao = new AccountDao();
    const account = new Account("user001", "pw123");
    dao.findOrNull.mockReturnValue(account);
    sut.setDao(dao);
    expect(sut.authenticate("user001", "pw123")).toBe(account);
  });
  test("exist account and not equal password", () => {
    const sut = new Authentication();
    const dao = new AccountDao();
    const account = new Account("user001", "pw999");
    dao.findOrNull.mockReturnValue(account);
    sut.setDao(dao);
    expect(sut.authenticate("user001", "pw123")).toBeNull();
  });
});
