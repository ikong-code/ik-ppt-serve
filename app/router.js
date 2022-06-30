'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.ppt.index);
  // router.get('/', 'public/dist/index.html');
  router.get('/ppt/list', controller.ppt.list);
  // router.get('/ppt/user', controller.ppt.user);
  router.post('/ppt/add', controller.ppt.add);
  router.post('/ppt/update', controller.ppt.update);
  router.get('/ppt/delete', controller.ppt.delete);
  router.get('/ppt/detail', controller.ppt.detail);
};
