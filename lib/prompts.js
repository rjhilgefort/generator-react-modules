module.exports.modulesDir = {
  type: 'input',
  name: 'modulesDir',
  message: 'Where is your "modules" directory, relative to project root?',
  default: 'src/modules',
  store: true,
};

module.exports.moduleName = {
  type: 'input',
  name: 'moduleName',
  message: 'Module name?',
};
