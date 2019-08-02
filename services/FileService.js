const { MongoClient, GridFSBucket } = require('mongodb');
const assert = require('assert');
const fs = require('fs');
const config = require('config');
const path = require('path');
const logger = require('../utils/logger');


function createFile(bucket, filePath) {
  try {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(bucket.openUploadStream(path.basename(filePath)))
        .on('error', function (err) { reject(err); })
        .on('finish', function (file) { resolve(file); });
    });
  } catch(e) {
    logger.info('createFileErr', e);
  }
}


// function isExitCollection(db) {
//   logger.info('dbCollection', db.)
// }

class FileService {

  dbConnect(callbackDbCreator, options) {
    // 连接到mongo服务
    const mongoUri = 'mongodb://localhost:27017';
    const client = new MongoClient(mongoUri, { useNewUrlParser: true });
    client.connect(async err => {
      assert.equal(null, err);
      logger.info('连接成功服务成功');
      // 使用test库，返回实例
      const db = client.db('test');
      const result = await callbackDbCreator(db, options);
      logger.info('操作结果', result);
      client.close();
      return result;
    })
  }

  async test(db) {
    const collection = db.collection('testCollection');
    collection.insertOne({ hh: 12 });
  }

  async uploadAndSavePhoto(db) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          bucketName: 'GridFSBucket'
        };
        const bucket = new GridFSBucket(db, options);
        const pathUrl = path.resolve('./utils/presale.jpg');

        const res = fs.createReadStream(pathUrl)
          .pipe(bucket.openUploadStream('presale.jpg'))
          .on('error', function(error) {
            assert.ifError(error);
          })
          .on('finish', function() {
            logger.info('上传图片成功', res);
            resolve({ filename: res.filename,  });
          });

      } catch(e) {
        logger.info('上传图片失败', e);
        reject(e);
      }
    })
  }

  downFile(db, options) {
    return new Promise((resolve, reject) => {
      try {
        const bucket = new db.GridFSBucket();
        const result = bucket.openDownloadStream(options.id);
        resolve(result);
      } catch(e) {
        reject(e);
      }
    })
  }

}

module.exports = new FileService();
