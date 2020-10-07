module.exports = class StringUtils {
  static echo(a) {
    return a;
  }

  static toSnakeCase(str) {
    let snake = str;
    const pattern = /[A-Z]/g;
    let result = pattern.exec(snake);
    while (result !== null) {
      snake = snake.replace(result[0], `_${result[0].toLowerCase()}`);
      result = pattern.exec(snake);
    }
    return snake.replace(/^_/, "");
  }
};
