'use strict';

const Service = require('egg').Service;

class PptService extends Service {
  async list() {
    const { app } = this;
    const sql = 'select * from list';
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async add(values) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('list', { ...values });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async detail(id) {
    const { app } = this;
    try {
      const result = await app.mysql.get('list', { id });
      return result;
    } catch (error) {
      return null;
    }
  }
  async update(id, values) {
    const { app } = this;
    try {
      const result = await app.mysql.update('list', { ...values }, {
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      return null;
    }
  }

  async delete(id) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('list', { id });
      return result;
    } catch (error) {
      return null;
    }
  }
}

module.exports = PptService;
