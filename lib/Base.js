const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const R = require('ramda');
const _ = require('lodash');
const prompts = require('./prompts');
const RE = require('./ramda-extras');


module.exports = class Base extends Generator {

  copy(file) {
    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(file),
      this.props
    );
  }

  prompting() {
    R.pipe(
      yosay, this.log
    )(`Welcome to the primo ${chalk.red('generator-react-modules')} generator!`);

    const desiredPrompts = R.props(this.prompts, prompts);

    return this.prompt(desiredPrompts)
      .then((props) => {
        this.props = props;

        // Conditional additions and overrides
        if (R.contains('moduleName')(this.prompts)) {
          this.props.moduleNameUpperFirst = _.upperFirst(props.moduleName);
        }
        if (RE.containsAll(['modulesDir', 'moduleName'], this.prompts)) {
          this.props.modulePath = `${props.modulesDir}/${props.moduleName}`;

          this.copy = (file) => {
            this.fs.copyTpl(
              this.templatePath(file),
              this.destinationPath(`${this.props.modulePath}/${file}`),
              this.props
            );
          };
        }
      });
  }

};
