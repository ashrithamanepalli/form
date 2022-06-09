const { Field } = require('./field.js');
const { Form } = require('./form.js');
const { MultiLineField } = require('./multiLineField.js');
const { validateHobbies, validateName,
  validateDob, validateNumber, validateAddress } = require('./validators.js');

const identity = (text) => text;
const convertToList = (text) => text.split(',');
const joinWithNewLine = (list) => list.join('\n');

const createForm = () => {
  const nameField = new Field('name', 'Enter name', validateName, identity);
  const dobField = new Field('dob', 'Enter dob', validateDob, identity);
  const hobbiesField = new Field(
    'hobbies', 'Enter hobbies', validateHobbies, convertToList);
  const phNumField = new Field(
    'phNum', 'Enter phNum', validateNumber, identity);
  const addressField = new MultiLineField(
    'address', ['Enter address line 1', 'Enter address line 2'],
    validateAddress, joinWithNewLine);

  const form = new Form(nameField, dobField, hobbiesField,
    phNumField, addressField);
  return form;
};

module.exports = { createForm };
