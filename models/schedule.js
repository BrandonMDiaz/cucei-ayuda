/**
 * @Author: schwarze_falke
 * @Date:   2018-10-07T13:20:58-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-07T14:08:46-05:00
 */

// Models for using the schedule class

const db = require('../db');

class Schedule {
  constructor(args) {
    this.nrc = args.nrc;
    this.name = args.name;
    this.first_day = args.first_day;
    this.sec_day = args.sec_day;
    this.classroom = args.classroom;
    this.section = args.section;
    this.credits = args.credits;
    this.building = args.building;
    this.taught_by = args.taught_by;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((res) => {
      this.result.push(new Schedule(res));
    });
    return this.result;
  }

  static checkUndefined(data) {
    this.result = {};
    data.forEach((dat) => {
      if (dat !== undefined) {
        console.log(dat);
      }
    });
    return this.result;
  }

  static async validSchedule(nrc) {
    await db.get('subject', 'nrc', `nrc = ${nrc}`)
      .then((results) => {
        this.result = results.length;
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(this.result);
    return this.result;
  }

  static async getAll() {
    await db.get('subject', '*')
      .then((results) => {
        this.result = Schedule.processResult(results);
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  static async get(columns, condition) {
    await db.get('subject', columns, condition)
      .then((results) => {
        this.result = results;
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  static async del(condition) {
    await db.del('subject', condition)
      .then((results) => {
        this.result = results;
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  async save() {
    await db.insert('subject', this)
      .then((results) => {
        this.result = results;
        return this.result;
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  async update(nrc) {
    const condition = `nrc = ${nrc}`;
    await db.update('subject', this, condition)
      .then((results) => {
        this.result = results;
        return this.result;
      })
      .catch((e) => {
        throw e;
      });
    return this.result;
  }

  async createRelation(nrc, userId) {
    if (Schedule.validSchedule(nrc)) {
      const scheduleItem = {
        stud_id: nrc,
        subject_id: userId,
      };
      await db.insert('subject_lists', scheduleItem)
        .then((results) => {
          this.result = results;
          return this.result;
        })
        .catch((e) => {
          throw e;
        });
    }
  }
}

module.exports = Schedule;
