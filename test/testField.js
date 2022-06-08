const assert = require('assert');
const { Field } = require('../src/field.js');

describe('field', () => {
  const isOfMaxLength = (text) => text.length >= 5;
  const toList = (text) => text.split(',');

  it('should correlate the response to its respective query', () => {
    const field = new Field('name', 'Enter name', () => true, (text) => text);
    field.fillField('Reena');
    assert.deepStrictEqual(field.getDetails(),
      { query: 'name', response: 'Reena' });
  });

  it('should parse the response according to its parser', () => {
    const field = new Field('hobbies', 'hobbies', () => true, toList);
    field.fillField('singing,dancing');
    assert.deepStrictEqual(field.getDetails(),
      { query: 'hobbies', response: ['singing', 'dancing'] });
  });

  it('should inform if the response is valid or not', () => {
    const field = new Field('name', 'Name', isOfMaxLength, (text) => text);
    assert.strictEqual(field.isValid('Tina'), false);
  });

  it('should give the prompt of the respective field', () => {
    const field = new Field('name', 'Name', () => true, (text) => text);
    assert.strictEqual(field.getPrompt(), 'Name');
  });
}
);
