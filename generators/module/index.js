const R = require('ramda');
const Base = require('../../lib/Base');


module.exports = class extends Base {

  get prompts() {
    return ['modulesDir', 'moduleName'];
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    R.forEach(this.copy)([
      'components/index.js',
      'actionTypes.js',
      'actions.js',
      'constants.js',
      'index.js',
      'model.js',
      'reducer.js',
      'selectors.js',
    ]);
  }
};
