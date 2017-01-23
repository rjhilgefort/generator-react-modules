
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-modules:component', () => {
  before(() => helpers.run(path.join(__dirname, '../generators/component'))
      .withPrompts({ someAnswer: true })
      .toPromise());

  it('creates files', () => {
    assert.file([
      'dummyfile.txt',
    ]);
  });
});
