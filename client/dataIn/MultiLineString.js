module.exports = class MultiLineString {
  static join(...args) {
    let str = "";
    for (let i = 0; i < args.length; i++) {
      str = `${str + args[i]}\n`;
    }
    return str;
  }
};
