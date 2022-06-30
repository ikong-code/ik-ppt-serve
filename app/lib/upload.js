'use strict';

const urllib = require('urllib');
const md5 = require('md5');
// const consola = require('consola')
// const path = require('path');
// const fs = require('fs-extra');
// const USER_HOME = process.env.HOME || process.env.USERPROFILE;
// const rc = path.join(USER_HOME, '.xdocrc');
// const rc = path.join(USER_HOME, '.xdocrc');

module.exports = async function upload(files, loginSuccessCallback) {
  // const existRc = await fs.pathExists(rc);
  // if (!existRc) {
  //   return '请先初始化 xdoc 配置：xdoc init';
  // }
  // const config = await fs.readJson(rc);
  const domain = 'https://saas.uban360.com';
  const loginRes = await urllib.request(
    `${domain}/baas-login/open/pwdLogin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      data: {
        username: '18792937599',
        password: md5('shinemo123'),
        validateCode: 'openLoginWithoutCheckCode',
      },
    }
  );
  const result = [];
  return new Promise(async (resolve, reject) => {
    if (loginRes.data.success) {
      const cookieArr = loginRes.headers['set-cookie'];
      // loginSuccessCallback && loginSuccessCallback();
      // const file = files[0];
      // consola.info(`uploading ${file}`)
      const getImgRes = async () => {
        const result = await urllib.request(
          `${domain}/open/smallapp/fileManager/upload.json`,
          {
            dataType: 'json',
            files,
            headers: {
              Cookie: cookieArr.join('; '),
            },
          }
        );
        return result;
      };
      const imgRes = await getImgRes();

      console.log(`upload success ${imgRes.data.data}`);
      result.push(imgRes.data.data);
      resolve(imgRes.data.data);

    } else {
      reject(loginRes.data.msg || '登录失败');
    }
  });

};
