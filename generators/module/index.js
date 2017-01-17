const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const R = require('ramda');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    R.pipe(
      yosay,
      this.log
    )(`Welcome to the primo ${chalk.red('generator-react-modules')} generator!`);

    const prompts = [{
      type: 'input',
      name: 'modulesDir',
      message: 'Where is your "modules" directory, relative to project root?',
      default: 'src/modules',
      store: true
    }, {
      type: 'input',
      name: 'moduleName',
      message: 'Module name?'
    }];

    return this.prompt(prompts)
      .then((props) => {
        this.props = R.merge(
          props,
          {
            moduleNameUpperFirst: _.upperFirst(props.moduleName),
            modulePath: `${props.modulesDir}/${props.moduleName}`,
          }
        );

        this.copy = (file) => {
          this.fs.copyTpl(
            this.templatePath(file),
            this.destinationPath(`${this.props.modulePath}/${file}`),
            this.props
          );
        };
      });
  }

  writing() {
    this.copy('components/.gitkeep');
    this.copy('actionTypes.js');
    this.copy('actions.js');
    this.copy('constants.js');
    this.copy('index.js');
    this.copy('model.js');
    this.copy('reducer.js');
    this.copy('selectors.js');
  }
}
