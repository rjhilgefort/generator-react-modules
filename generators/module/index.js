const R = require('ramda');
const Base = require('../../lib/Base');

module.exports = class extends Base {
  get requiredProps() {
    return ['moduleName', 'moduleNameUpperFirst', 'modulePath'];
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    R.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(`${this.props.modulePath}/${file}`),
        R.pick(['moduleName', 'moduleNameUpperFirst'], this.props)
      );
    }, [
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
