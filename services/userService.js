const { User } = require('../models');
const logger = require('../utils/logger');

class UserService {
  // 用户注册接口
  async registerUser(registerInfo) {
    const result = await User.find({ name: registerInfo.name});
    if(result.length) {
      // TODO 最好能成异常抛出
      return '该账号已经注册'
    }

    const user = new User({
      name: registerInfo.name,
      cellphone : registerInfo.cellphone,
      age : registerInfo.age,
      gender : registerInfo.gender,
      hobby : registerInfo.hobby,
      job : registerInfo.job,
      password : registerInfo.password
    });

    const data = await user.save();

    return data;
  }

  // 用户登录接口
  async login(name, password) {
    // 实际 data 里面要用的数据存在_doc 的属性中
    const data = await User.findOne({ name, password });
    if(data === null) {
      return { isLoginSuccess: false };
    }
    // 去除密码，增加是否注册成功
    const handleData = {};
    delete(data._doc.password);
    Object.assign(handleData, data._doc, { isLoginSuccess: true });
    return handleData;
  }
}

module.exports = new UserService();
