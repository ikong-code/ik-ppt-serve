'use strict';

const Service = require('egg').Service;
const fs = require('fs');

class PptService extends Service {
  /**
   *
   * @param {*} filePath 读取的文件地址
   * @return 返回一个promise实例对象
   */
  async readFile(filePath) {
    const options = {
      flag: 'r',
      encoding: 'utf-8',
    };
    return new Promise(function(resolve) {
      fs.readFile(filePath, options, function(err, data) {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
        }
      });
    });

  }
  async list() {
    const listFilePath = this.config.pptList;
    const options = {
      flag: 'r',
      encoding: 'utf-8',
    };
    return new Promise(function(resolve, reject) {
      // 异步读取
      fs.readFile(listFilePath, options, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    // try {
    //   const redFileList = async dataList => {
    //     const readList = [];
    //     if (dataList) {
    //       for (let i = 0; i < dataList.length; i++) {
    //         const data = await this.readFile(baseUrl + '/' + dataList[i]);
    //         readList.push(data);
    //       }
    //       return readList;
    //     }
    //   };
    //   return new Promise(resolve => {
    //     fs.readdir(baseUrl, async (err, file) => {
    //       let fileList = [];
    //       if (!err) {
    //         fileList = file;
    //       } else {
    //         console.log(err);
    //       }
    //       const list = await redFileList(fileList);
    //       resolve(list);
    //     });
    //   });
    // } catch (error) {
    //   return null;
    // }
  }

  async add(values, detail) {
    const listFilePath = this.config.pptList;
    const pptDetail = this.config.pptDetail;
    const options = {
      flag: 'r',
      encoding: 'utf-8',
    };
    return new Promise(function(resolve, reject) {
      // 异步读取
      fs.readFile(listFilePath, options, function(err, data) {
        if (err) {
          reject(err);
        } else {
          const list = JSON.parse(data).list;
          list.push({
            ...values,
          });
          fs.writeFile(listFilePath, JSON.stringify({ list }), err => {
            if (err) {
              reject(err);
            } else {
              // 写入
              fs.writeFileSync(pptDetail + '/' + values.id + '.json', JSON.stringify({ detail }));
              resolve();
            }
          });
        }
      });
    });
  }

  async detail(id) {
    const pptDetail = this.config.pptDetail;
    const options = {
      flag: 'r',
      encoding: 'utf-8',
    };
    return new Promise((resolve, reject) => {
      // 异步读取
      fs.readFile(pptDetail + '/' + id + '.json', options, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async delete(id) {
    const listFilePath = this.config.pptList;
    const pptDetail = this.config.pptDetail;
    const options = {
      flag: 'r',
      encoding: 'utf-8',
    };
    return new Promise(function(resolve, reject) {
      // 异步读取
      fs.readFile(listFilePath, options, function(err, data) {
        if (err) {
          reject(err);
        } else {
          const list = JSON.parse(data).list;
          const targetIdx = list.findIndex(i => i.id === id);
          if (targetIdx > -1) {
            list.splice(targetIdx, 1);


            fs.writeFile(listFilePath, JSON.stringify({ list }), err => {
              if (err) {
                reject(err);
              } else {
                fs.unlink(pptDetail + '/' + id + '.json', err => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              }
            });
          } else {
            reject('不存在');
          }

        }
      });
    });
  }

  async update(values, detail) {
    const listFilePath = this.config.pptList;
    const pptDetail = this.config.pptDetail;
    const options = {
      flag: 'r',
      encoding: 'utf-8',
    };
    const id = values.id;
    return new Promise(function(resolve, reject) {
      // 异步读取
      fs.readFile(listFilePath, options, function(err, data) {
        if (err) {
          reject(err);
        } else {
          const list = JSON.parse(data).list;
          const targetIdx = list.findIndex(i => i.id === id);
          if (targetIdx > -1) {
            list[targetIdx] = values;
            fs.writeFile(listFilePath, JSON.stringify({ list }), err => {
              if (err) {
                reject(err);
              } else {
                fs.writeFile(pptDetail + '/' + id + '.json', JSON.stringify({ detail }), err => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              }
            });
          } else {
            reject('不存在');
          }

        }
      });
    });
  }
}

module.exports = PptService;
