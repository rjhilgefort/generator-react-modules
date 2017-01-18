const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const R = require('ramda');
const _ = require('lodash');
const T = require('treis');
const prompts = require('./prompts');


module.exports = class Base extends Generator {
  prompting() {
    R.pipe(
      yosay, this.log
    )(`Welcome to the primo ${chalk.red('generator-react-modules')} generator!`);

    const desiredPrompts = R.props(this.prompts, prompts);

    return this.prompt(desiredPrompts)
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

};
