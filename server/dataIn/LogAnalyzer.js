class LogAnalyzer {
  constructor(logLoader) {
    this.logLoader = logLoader;
  }

  analyze(file) {
    try {
      const rawData = this.logLoader.load(file);
      return this.doAnalyze(rawData);
    } catch (e) {
      throw new Error(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  doAnalyze() {
    return {};
  }
}

class LogLoader {
  // eslint-disable-next-line class-methods-use-this
  load() {
    return {};
  }
}

module.exports = {
  LogAnalyzer,
  LogLoader
};
