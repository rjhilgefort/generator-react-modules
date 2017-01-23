const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const R = require('ramda');
const _ = require('lodash');
const RE = require('./ramda-extras');
const {
  prompts,
  promptsOrder,
  translateRequiredProp,
  translateRequiredProps,
} = require('./prompts');

module.exports = class Base extends Generator {
  prompting() {
    R.pipe(
      yosay,
      this.log
    )(`Welcome to the primo ${chalk.red('generator-react-modules')} generator!`);

    const promptForRequiredProps = R.pipe(
      translateRequiredProps,
      RE.uniqSortByArray(promptsOrder),
      R.props(R.__, prompts),
      this.prompt.bind(this)
    );

    return promptForRequiredProps(this.requiredProps)
      .then((props) => {
        this.props = props;

        const shouldTranslateRequiredProp = prop => (
          R.contains(prop, this.requiredProps) &&
          RE.containsAll(
            translateRequiredProp(prop),
            R.keys(this.props)
          )
        );

        // Convenience property for `moduleName`
        if (shouldTranslateRequiredProp('moduleName')) {
          this.props.moduleNameUpperFirst = _.upperFirst(this.props.moduleName);
        }

        // Construct `modulePath` if needed
        if (shouldTranslateRequiredProp('modulePath')) {
          this.props.modulePath = `${this.props.modulesDir}/${this.props.moduleName}`;
        }

        // Always `upperFirst` the component name
        if (shouldTranslateRequiredProp('componentName')) {
          this.props.componentName = _.upperFirst(this.props.componentName);
        }
      });
  }

  copyComponent({ templatePath, modulePath, componentName, componentFileName = componentName }) {
    // Move in component
    this.fs.copyTpl(
      `${templatePath}/_Component.js`,
      this.destinationPath(`${modulePath}/components/${componentFileName}.js`),
      { componentName }
    );

    // Move in component tests
    this.fs.copyTpl(
      `${templatePath}/_Component.test.js`,
      this.destinationPath(`${modulePath}/components/${componentFileName}.test.js`),
      { componentName }
    );

    const destIndexFile = this.destinationPath(`${modulePath}/components/index.js`);

    // Handle missing `index.js` (cases where a modules hasn't been generated first?)
    if (!this.fs.exists(destIndexFile)) {
      this.fs.copy(require.resolve('../generators/module/templates/components/index.js'), destIndexFile);
    }

    // Append new component to `index.js`
    this.fs.copy(destIndexFile, destIndexFile, {
      process: contents =>
        `${contents}export { default as ${componentFileName} } from './${componentFileName}';\n`,
    });
  }
};
