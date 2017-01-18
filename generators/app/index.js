const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const R = require('ramda');

module.exports = class extends Generator {
  initializing() {
    R.pipe(
      yosay, this.log
    )(`Welcome to the primo ${chalk.red('generator-react-modules')} generator!`);

    this.composeWith(require.resolve('../module'));
  }
};
