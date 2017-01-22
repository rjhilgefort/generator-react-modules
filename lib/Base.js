const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const R = require('ramda');
const _ = require('lodash');
const T = require('treis');
const { prompts, promptsOrder } = require('./prompts');
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
      yosay,
      this.log
    )(`Welcome to the primo ${chalk.red('generator-react-modules')} generator!`);

    const translateRequiredProp = (prop) => {
      switch (prop) {
        case 'moduleNameUpperFirst': {
          return [];
          break;
        }
        case 'modulePath': {
          return ['modulesDir', 'moduleName'];
          break;
        }
        default: {
          return [prop];
          break;
        }
      };
    };
    const translateRequiredProps = R.reduce(
      (memo, prop) => [...memo, ...translateRequiredProp(prop)], []
    );

    const promptForRequiredProps = R.pipe(
      translateRequiredProps,
      RE.uniqSortByArray(promptsOrder),
      R.props(R.__, prompts),
      this.prompt.bind(this)
    );

    return promptForRequiredProps(this.requiredProps)
      .then((props) => {
        this.props = props;

        // Convenience property for `moduleName`
        if (R.contains('moduleName', this.requiredProps)) {
          this.props.moduleNameUpperFirst = _.upperFirst(props.moduleName);
        }

        // Construct `modulePath` if needed
        if (R.contains('modulePath', this.requiredProps) &&
            RE.containsAll(['modulesDir', 'moduleName'], R.keys(this.props))
        ) {
          this.props.modulePath = `${props.modulesDir}/${props.moduleName}`;
        }

        // Component generation logic
        if (R.contains('componentName', this.requiredProps)) {
          this.props.componentName = _.upperFirst(props.componentName);

          // TODO: Don't create instance method on the fly- promotes a fragile interface
          this.copyComponent = (isContainer = false) => {
            const { modulePath } = this.props;
            let { componentName } = this.props;
            if (isContainer) componentName += 'Container';

            const templatePath = (file) => {
              const type = R.pipe(
                R.ifElse(R.identity, R.always('container'), R.always('presentation')),
                R.concat(R.__, '-component')
              )(isContainer);
              return require.resolve(`../generators/${type}/templates/${file}`);
            }

            // Move in component
            this.fs.copyTpl(
              templatePath('_Component.js'),
              this.destinationPath(`${modulePath}/components/${componentName}.js`),
              this.props
            );

            // Move in component tests
            this.fs.copyTpl(
              templatePath('_Component.test.js'),
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
