const assert = require('assert');
const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');

describe('form', () => {
  const alwaysTrue = () => true;
  const identity = (text) => text;

  it('should return current field prompt', () => {
    const nameField = new Field('name', 'name', alwaysTrue, identity);
    const form = new Form(nameField);
    assert.strictEqual(form.getCurrentPrompt(), 'name');
  });

  it('should return current field prompt when current field is not first one',
    () => {
      const nameField = new Field('name', 'name', alwaysTrue, identity);
      const dobField = new Field('dob', 'dob', alwaysTrue, identity);
      const form = new Form(nameField, dobField);
      form.addInfo('a');
      assert.strictEqual(form.getCurrentPrompt(), 'dob');
    });

  it('should evaluate to true when all fields received their responses', () => {
    const nameField = new Field('name', 'name', alwaysTrue, identity);
    const form = new Form(nameField);
    form.addInfo('a');
    assert.strictEqual(form.areQueriesComplete(), true);
  });

  it('should evaluate to false when fields are yet to receive response', () => {
    const nameField = new Field('name', 'name', alwaysTrue, identity);
    const dobField = new Field('dob', 'dob', alwaysTrue, identity);
    const form = new Form(nameField, dobField);
    form.addInfo('a');
    assert.strictEqual(form.areQueriesComplete(), false);
  });

  it('should throw error when invalid response is provided', () => {
    const checkIfEnoughLength = (text) => text.length >= 5;
    const nameField = new Field('name', 'name', checkIfEnoughLength, identity);
    const form = new Form(nameField);
    assert.throws(() => form.addInfo('a'), {
      message: 'Invalid Response'
    });
  });

  it('should return details of all the responses received by the form', () => {
    const nameField = new Field('name', 'name', alwaysTrue, identity);
    const form = new Form(nameField);
    form.addInfo('a');
    assert.deepStrictEqual(form.getAllDetails(), { name: 'a' });
  });
});
