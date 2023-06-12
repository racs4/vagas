import data from "../../fakeData.js";

export class User {
  static count = data.length;

  constructor(name, job) {
    this.name = name;
    this.job = job;
    this._accessed = 0;
    this._permissions = {
      erase: false,
      update: false,
    };
    this.id = ++User.count;
  }
}
