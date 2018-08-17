const Hapi = require('hapi');
const hapiSwagger = require('hapi-swagger');
const inert = require('inert');
const config = require('config');
const vision = require('vision');
const logger = require('./utils/logger');
const routes = require('./routes');
const pack = require('./package.json');

const server = new Hapi.Server({
  port: config.get('PORT')
});

const swaggerConfig = {
  plugin: hapiSwagger,
  options: {
    info: {
      title: `${pack.name} API Documentation`,
      version: pack.version
    }
  }
};

// 初始化服务

(async () => {
  try {
    await server.register([ inert, vision, swaggerConfig]);
    await server.start();
    logger.info(`Server running at: ${server.info.uri}`);
    } catch (err) {
    logger.error('启动服务失败', { err });
    throw err;
    }
})();

server.events.on('response', (request) => {
  const res = request.raw.res;
  let payload = '';

  try {
    const data = {
      latency: request.info.responded - request.info.received,
      method: request.method.toUpperCase(),
      url: request.url.path,
      statusCode: res.statusCode,
      reqPayload: request.payload,
      resPayload: payload,
      userAgent: request.headers['user-agent']
    };
    logger.info(data);
  } catch (err) {
    logger.error('打印响应结果失败:', { err });
  }
});

server.route(routes);
