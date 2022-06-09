const assert = require('assert');
const { MultiLineField } = require('../src/multiLineField.js');

describe('multiLineField', () => {
  const joinWithNewLine = (list) => list.join('\n');

  it('should parse the response according to its parser', () => {
    const multiLineField = new MultiLineField(
      'address', '[addr1, addr2]', () => true, joinWithNewLine);

    multiLineField.fillField('city');
    multiLineField.fillField('state');

    assert.deepStrictEqual(multiLineField.getDetails(),
      { query: 'address', response: 'city\nstate' });
  });

}
);
