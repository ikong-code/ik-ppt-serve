/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1656471717450_9859';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };

  // 全局声明
  const userConfig = {
    pptDir: 'app/public',
    pptList: 'app/public/list.json',
    pptDetail: 'app/public/detail',
    assetsDir: 'public/dist/assets',
  };


  // exports.mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: 'localhost', //  81.68.165.190
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: '123456', // 初始化密码，没设置的可以不写
  //     // 数据库名
  //     database: 'ppt', // 我们新建的数据库名称
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };

  config.view = {
    // root: path.join(appInfo.baseDir, 'app/'),
    root: path.join(appInfo.baseDir, 'app/public/'),
    mapping: { '.html': 'ejs' }, // 左边写成.html后缀，会自动渲染.html文件
  };

  config.cors = {
    origin: '*',
    credentials: true, // 允许cookie跨域
    allowMethods: 'GET,POST,PUT,HEAD,DELETE,PATCH',
  };

  return {
    ...config,
    ...userConfig,
  };
};
