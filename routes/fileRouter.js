const Router = require('../utils/Router');
const logger = require('../utils/logger');
const Joi = require('joi');
const FileService = require('../services/FileService');

const router = new Router();

router.post('/file/upload', {
  description: '上传文件',
  tags: ['api'],
  async handler(req, h) {
    return await FileService.dbConnect(FileService.uploadAndSavePhoto);
  }
});

router.post('/file/down', {
  description: '下载文件',
  tags: ['api'],
  validate: {
    payload: {
      fileId
    }
  },
  async handler(req, h) {
    const { fileId } = req;
    const options = {
      fileId
    }
    return await FileService.dbConnect(FileService.uploadAndSavePhoto, options);
  }
});

module.exports = router;


