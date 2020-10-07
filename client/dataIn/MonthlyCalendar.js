module.exports = class MonthlyCalendar {
  constructor(date) {
    this.date = date;
  }

  getRemainingDays() {
    return (
      new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate() -
      this.date.getDate()
    );
  }
};
