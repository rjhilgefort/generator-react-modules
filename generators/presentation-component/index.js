const Base = require('../../lib/Base');

module.exports = class extends Base {
  get requiredProps() {
    return ['modulePath', 'componentName'];
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.copyComponent({
      templatePath: this.templatePath(),
      modulePath: this.props.modulePath,
      componentName: this.props.componentName,
    });
  }
};
