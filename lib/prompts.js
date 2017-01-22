module.exports.promptsOrder = ['modulesDir', 'moduleName', 'componentName'];

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
