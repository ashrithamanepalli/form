const { Field } = require('./field.js');
const { Form } = require('./form.js');
const { validateHobbies, validateName,
  validateDob, validateNumber } = require('./validators.js');

const identity = (text) => text;
const convertToList = (text) => text.split(',');

const createForm = () => {
  const nameField = new Field('name', 'Enter name', validateName, identity);
  const dobField = new Field('dob', 'Enter dob', validateDob, identity);
  const hobbiesField = new Field(
    'hobbies', 'Enter hobbies', validateHobbies, convertToList);
  const phNumField = new Field(
    'phNum', 'Enter phNum', validateNumber, identity);

  const form = new Form(nameField, dobField, hobbiesField, phNumField,);
  return form;
};

module.exports = { createForm };
