module.exports = class Authentication {
  getDao() {
    return this.dao;
  }

  setDao(val) {
    this.dao = val;
  }

  authenticate(userId, password) {
    const account = this.dao.findOrNull(userId);
    if (account === null) return null;
    return account.password === password ? account : null;
  }
};
