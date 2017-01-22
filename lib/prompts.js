const R = require('ramda');

module.exports.prompts = {
  modulesDir: {
    type: 'input',
    name: 'modulesDir',
    message: 'Where is your "modules" directory, relative to project root?',
    default: 'src/modules',
    store: true,
  },
  moduleName: {
    type: 'input',
    name: 'moduleName',
    message: 'Module name?',
    store: true,
  },
  componentName: {
    type: 'input',
    name: 'componentName',
    message: 'Component name?',
  },
};

module.exports.promptsOrder = ['modulesDir', 'moduleName', 'componentName'];

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
module.exports.translateRequiredProp = translateRequiredProp;

const translateRequiredProps = props => (
  R.reduce((memo, prop) => [...memo, ...translateRequiredProp(prop)], [])(props)
);
module.exports.translateRequiredProps = translateRequiredProps;
