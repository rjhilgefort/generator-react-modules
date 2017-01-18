const R = require('ramda');
const Base = require('../../lib/Base');


module.exports = class extends Base {

  get prompts() {
    return ['modulesDir', 'moduleName', 'componentName'];
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.copyComponent(true);
  }

};
