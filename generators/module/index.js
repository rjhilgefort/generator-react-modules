const Generator = require('yeoman-generator');
const R = require('ramda');
const _ = require('lodash');
const { modulesDir, moduleName } = require('../../lib/prompts');


module.exports = class App extends Generator {
  prompting() {
    return this.prompt([modulesDir, moduleName])
      .then((props) => {
        this.props = R.merge(
          props,
          {
            moduleNameUpperFirst: _.upperFirst(props.moduleName),
            modulePath: `${props.modulesDir}/${props.moduleName}`,
          }
        );
      });
  }

  writing() {
    const copy = (file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(`${this.props.modulePath}/${file}`),
        this.props
      );
    };
    R.forEach(copy)([
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
