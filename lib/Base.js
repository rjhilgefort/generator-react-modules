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

        // Convenience property for `moduleName`
        if (R.contains('moduleName')(this.prompts)) {
          this.props.moduleNameUpperFirst = _.upperFirst(props.moduleName);
        }

        // We should have these for every generator
        // Adds copy method for module copying, adds `modulePath`
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

        // Component generation logic
        if (R.contains('componentName')(this.prompts)) {
          this.props.componentName = _.upperFirst(props.componentName);
          this.copyComponent = (isContainer = false) => {
            let { modulePath, componentName } = this.props;
            if (isContainer) componentName += "Container"

            // Move in component
            this.fs.copyTpl(
              this.templatePath('_Component.js'),
              this.destinationPath(`${modulePath}/components/${componentName}.js`),
              this.props
            );

            // Move in component tests
            this.fs.copyTpl(
              this.templatePath('_Component.test.js'),
              this.destinationPath(`${modulePath}/components/${componentName}.test.js`),
              this.props
            );

            const destIndexFile = this.destinationPath(`${modulePath}/components/index.js`);

            // Handle missing `index.js` (cases where a modules hasn't been generated first?)
            if (!this.fs.exists(destIndexFile)) {
              this.fs.copy(require.resolve('../generators/module/templates/components/index.js'), destIndexFile);
            }

            // Append new component to `index.js`
            this.fs.copy(destIndexFile, destIndexFile, {
              process: contents =>
                `${contents}export { default as ${componentName} } from './${componentName}';\n`,
            });
          };
        }
      });
  }

};
