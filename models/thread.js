const db = require('../db');

class ThreadMdl {
  constructor({
    id, subject, created, user_id, topic_id
  }) {
    this.id = id;
    //this.exist = exist;
    this.subject = subject;
    this.created = created;
    this.user_id = user_id;
    this.topic_id = topic_id;
  }

  required() {
    return (this.subject !== undefined
    && this.created !== undefined && this.user_id !== undefined
    && this.topic_id !== undefined);
  }

  static processData(data) {
    const results = [];
    data.forEach((res) => {
      results.push(new ThreadMdl(res));
    });
    return results;
  }

  static async getAll() {
    let threads = await db.getAll('threads');
    threads = this.processData(threads);
    return threads;
  }

  static async find(id) {
    let thread = await db.get('threads', 'id', id);
    thread = this.processData(thread);
    return thread;
  }

  async save() {
    let result;
    delete this.id;
    if (this.required()) {
      try {
        result = await db.insertTh('threads', this);
      } catch (e) {
        if (e) {
          return 'error';
        }
      }
      const id = result.insertId;
      if (id > 0) {
        return 1;
      }
      return 0;
    }
    return 'bad reques';
  }

  async modify({ id, content, date}) {
    let query = ''
  }
  async delete(id) {
    try {
      this.result = await db.del('threads', 'id', id);
    } catch (e) {
      return 0;
    }
    if (this.result.affectedRows === 0) {
      return 0;
    }
    return 1;
  }
}
module.exports = ThreadMdl;
