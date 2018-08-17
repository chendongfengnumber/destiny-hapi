const Router = require('../utils/Router');
const logger = require('../utils/logger');
const Joi = require('joi');
const userServices = require('../services/userService');

const router = new Router();

router.post('/register', {
  description: '用户注册接口',
  tags: ['api'],
  validate: {
    payload: {
      name: Joi.string().required().description('用户名/账户名'),
      age: Joi.number().required().description('年龄'),
      gender: Joi.string().required().description('性别'),
      hobby: Joi.string().required().description('爱好'),
      job: Joi.string().required().description('工作'),
      password: Joi.string().required().description('密码'),
      cellphone: Joi.string().required().description('电话号码')
    }
  },
  async handler(req, h) {
    const data = await userServices.registerUser(req.payload);
    logger.info('成功注册', data);
    return data;
  }
});


router.post('/login', {
  description: '用户登录接口',
  tags: ['api'],
  validate: {
    payload: {
      name: Joi.string().required().description('用户名/账户名'),
      password: Joi.string().required().description('密码')
    }
  },
  async handler(req, h) {
    const { name, password } = req.payload;
    const data = await userServices.login(name, password);
    logger.info('成功登录', data);
    return data;
  }
});


module.exports = router;
