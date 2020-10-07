class NetworkResources {
  constructor(loader) {
    this.loader = loader;
  }

  load() {
    const reader = this.loader.getInput();
    const str = reader.read();
    return str;
  }
}

class NetworkLoader {
  // eslint-disable-next-line class-methods-use-this
  getInput() {
    return null;
  }
}

module.exports = {
  NetworkResources,
  NetworkLoader
};
