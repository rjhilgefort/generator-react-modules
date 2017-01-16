const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = Generator.extend({
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the primo ${chalk.red('generator-react-features')} generator!`,
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true,
    }];

    return this.prompt(prompts)
      .then((props) => {
        this.props = props;
      });
  },

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt'),
    );
  },

  install() {
    this.installDependencies();
  },
});
