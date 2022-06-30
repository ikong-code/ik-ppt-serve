'use strict';
const Controller = require('egg').Controller;
const moment = require('moment');

class pptController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html', { path: this.config.assetsDir });
  }
  async user() {
    const { ctx } = this;
    const { name, slogen } = await ctx.service.ppt.user();
    ctx.body = {
      name, slogen,
    };
  }
  async list() {
    const { ctx } = this;
    // const { page = 1, page_size = 10 } = ctx.query;
    // console.log(ctx.query);
    try {
      const result = await ctx.service.ppt.list();
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data: JSON.parse(result).list,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '查询失败',
        data: null,
      };
    }
  }

  async add() {
    const { ctx } = this;
    const { name, username, desc = '', detail } = ctx.request.body;
    const createtime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const id = Math.random().toString(36).slice(2);
    try {
      const request = await ctx.service.ppt.add({ id, name, createtime, desc, username }, detail);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: request,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }

  async detail() {
    const { ctx } = this;
    const { id } = ctx.query;
    try {
      const result = await ctx.service.ppt.detail(id);
      const data = JSON.parse(result);
      // console.log(detail);
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data: data.detail,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '查询失败',
        data: null,
      };
    }
  }

  async update() {
    const { ctx } = this;
    const { id, detail } = ctx.request.body;
    try {
      await ctx.service.ppt.update(id, detail);
      ctx.body = {
        code: 200,
        msg: '更新成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '更新失败',
        data: null,
      };
    }
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.query;
    try {
      await ctx.service.ppt.delete(id);
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '删除失败',
        data: null,
      };
    }
  }
}

module.exports = pptController;
