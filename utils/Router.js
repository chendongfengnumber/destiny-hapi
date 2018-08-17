module.exports = class Router {
  constructor() {
    this.all = [];
  }

  route(options) {
    this.all.push(options)
  }

  get(path, config) {
    this.route({ method: 'GET', path, config });
  }

  post(path, config) {
    this.route({ method: 'POST', path, config });
  }

  delete(path, config) {
    this.route({ method: 'DELETE', path, config });
  }

  put(path, config) {
    this.route({ method: 'PUT', path, config });
  }

  patch(path, config) {
    this.route({ method: 'PATCH', path, config });
  }

  option(path, config) {
    this.route({ method: 'OPTION', path, config });
  }

  routes() {
    return this.all;
  }
};
