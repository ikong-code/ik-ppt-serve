'use strict';
const Controller = require('egg').Controller;
const moment = require('moment');

class pptController extends Controller {
  async user() {
    const { ctx } = this;
    const { name, slogen } = await ctx.service.ppt.user();
    ctx.body = {
      name, slogen,
    };
  }
  async list() {
    const { ctx, app } = this;
    const { page = 1, page_size = 10 } = ctx.query;
    console.log(ctx.query);
    const result = await ctx.service.ppt.list();
    console.log(result, 'result');
    ctx.body = result;
  }

  async detail() {
    const { ctx } = this;
    const { id } = ctx.query;
    try {
      const result = await ctx.service.ppt.detail(id);
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data: result,
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
    const { ctx, app } = this;
    const { name, username, desc = '', detail } = ctx.request.body;
    console.log(ctx.request.body, 'ctx.query.body');
    const createtime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    try {
      const result = await ctx.service.ppt.add({ name, createtime, desc, detail, username });
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }

  async update() {
    const { ctx, app } = this;
    const { id, ...rest } = ctx.request.body;
    try {
      const result = await ctx.service.ppt.update(id, rest);
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
      const result = await ctx.service.ppt.delete(id);
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
