const StringUtils = require("../dataIn/StringUtils");

describe("StringUtils", () => {
  describe("echo", () => {
    test("spec", () => {
      expect(StringUtils.echo("abc")).toBe("abc");
    });
  });
  describe("toSnakeCase", () => {
    test("aaa is aaa", () => {
      expect(StringUtils.toSnakeCase("abc")).toBe("abc");
    });
    test("HelloWorld is hello_world", () => {
      expect(StringUtils.toSnakeCase("HelloWorld")).toBe("hello_world");
    });
    test("practiceJunit is practice_junit", () => {
      expect(StringUtils.toSnakeCase("practiceJunit")).toBe("practice_junit");
    });
  });
});
