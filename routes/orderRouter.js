const Router = require('../utils/Router');
const logger = require('../utils/logger');
const Joi = require('joi');
const userServices = require('../services/userService');
const FileService = require('../services/FileService');

const router = new Router();

router.post('/order', {
  description: '创建订单',
  tags: ['api'],
  validate: {
    payload: {
      shopeeOrderId: Joi.string().required().description('虾皮订单号'),
      shopeeInventory: Joi.number().required().description('虾皮仓库'),
      shipmentIds: Joi.array().required().description('包裹集合'),
      shopeePDFName: Joi.string().required().description('PDF文件名称'),
      mainShopName: Joi.string().required().description('主商品图名称'),
      remarks: Joi.string().required().description('备注信息')
    }
  },
  async handler(req, h) {
    const data = await userServices.registerUser(req.payload);
    logger.info('成功注册', data);
    return data;
  }
});

module.exports = router;
