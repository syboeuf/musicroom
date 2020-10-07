const ItemStock = require("../dataIn/ItemStock");
const Item = require("../dataIn/Item");

describe("ItemStock at Initial", () => {
  let sut = null;
  let book = null;
  beforeEach(() => {
    sut = new ItemStock();
    book = new Item("book", 3800);
  });
  test("getNum is 0 at initial", () => {
    expect(sut.getNum(book)).toBe(0);
  });
  test("getNum is 0 at illegal args", () => {
    expect(sut.getNum()).toBe(0);
  });
});

describe("ItemStock after add Item", () => {
  let sut = null;
  let book = null;
  beforeEach(() => {
    sut = new ItemStock();
    book = new Item("book", 3800);
    sut.add(book);
  });
  test("getNum is 1 after add Item", () => {
    expect(sut.getNum(book)).toBe(1);
  });
  test("getNum is 2 after add same Item", () => {
    sut.add(book);
    expect(sut.getNum(book)).toBe(2);
  });
  test("getNum is 1 after add different Item", () => {
    const bike = new Item("bike", 57000);
    sut.add(bike);
    expect(sut.getNum(book)).toBe(1);
  });
});
