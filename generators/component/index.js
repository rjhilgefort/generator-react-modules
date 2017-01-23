const R = require('ramda');
const path = require('path');
const Base = require('../../lib/Base');

module.exports = class extends Base {
  get requiredProps() {
    return ['modulePath', 'componentName'];
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    // To use this in our pipline, we need to return `params`
    const copyComponentPipe = (params) => {
      this.copyComponent(params);
      return params;
    };

    R.pipe(
      R.pick(['modulePath', 'componentName']),
      // Generate presentation component
      R.merge(R.__, {
        templatePath: path.resolve(`${__dirname}/../presentation-component/templates`),
      }),
      copyComponentPipe,
      // Generate container component
      R.merge(R.__, {
        componentFileName: `${this.props.componentName}Container`,
        templatePath: path.resolve(`${__dirname}/../container-component/templates`),
      }),
      copyComponentPipe
    )(this.props);
  }
};
