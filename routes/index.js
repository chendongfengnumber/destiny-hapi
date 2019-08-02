const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');


module.exports = [
  ...userRouter.routes(),
  ...orderRouter.routes()
];
