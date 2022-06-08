const assert = require('assert');
const { registerResponse } = require('../src/fillForm.js');
const { endInputStream } = require('../main.js');
const { Field } = require('../src/field.js');
const { Form } = require('../src/form.js');

describe('fillForm', () => {
  const identity = (text) => text;
  const alwaysTrue = () => true;
  const isEnoughLength = (text) => text.length >= 5;

  it('should answer current query and show message of next query', () => {
    const nameField = new Field('name', 'name', alwaysTrue, identity);
    const dobField = new Field('dob', 'dob', alwaysTrue, identity);
    const form = new Form(nameField, dobField);

    const responses = [];
    const logger = (arg) => responses.push(arg);
    registerResponse(form, 'ashritha', logger, endInputStream);

    assert.deepStrictEqual(responses, ['dob']);
  });

  it('should display prompts in sync', () => {
    const nameField = new Field('name', 'name', alwaysTrue, identity);
    const dobField = new Field('dob', 'dob', alwaysTrue, identity);
    const hobbiesField = new Field('hobbies', 'hobbies', alwaysTrue, identity);
    const form = new Form(nameField, dobField, hobbiesField);

    const responses = [];
    const logger = (arg) => responses.push(arg);
    registerResponse(form, 'ashritha', logger, endInputStream);
    registerResponse(form, '1234-56-78', logger, endInputStream);

    assert.deepStrictEqual(responses, ['dob', 'hobbies']);
  });

  it('should display Thank you message after receiving all responses', () => {
    const nameField = new Field('name', 'name', alwaysTrue, identity);
    const dobField = new Field('dob', 'dob', alwaysTrue, identity);
    const form = new Form(nameField, dobField);

    const responses = [];
    const logger = (arg) => responses.push(arg);
    registerResponse(form, 'ashritha', logger, endInputStream);
    registerResponse(form, '1234-56-78', logger, endInputStream);

    assert.deepStrictEqual(responses, ['dob', 'Thank You']);
  });

  it('for invalid response display invalid message and same prompt as prev',
    () => {
      const nameField = new Field('name', 'name', isEnoughLength, identity);
      const dobField = new Field('dob', 'dob', alwaysTrue, identity);
      const form = new Form(nameField, dobField);

      const responses = [];
      const logger = (arg) => responses.push(arg);
      registerResponse(form, 'ash', logger, endInputStream);

      assert.deepStrictEqual(responses, ['Invalid Response', 'name']);
    });
});
