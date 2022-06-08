const fs = require('fs');
const { Form } = require('./form.js');
const { Field } = require('./field.js');

const endInputStream = (details) => {
  console.log('Thank You');
  fs.writeFileSync('./form.json', JSON.stringify(details), 'utf8');
  process.stdin.destroy();
};

const checkIfNotEmpty = (text) => text.length > 0;
const validateHobbies = (hobbies) => checkIfNotEmpty(hobbies);
const validateName = (name) => /[ a-z]+/.test(name) && name.length >= 5;
const validateDob = (dob) => /^\d{4}-\d{2}-\d{2}$/.test(dob);
const validateNumber = (phNumber) => {
  return phNumber.length === 10 && /\d{10}/.test(phNumber);
};

const identity = (text) => text;
const convertToList = (text) => text.split(',');

const createForm = () => {
  const nameField = new Field('name', 'Enter name', validateName, identity);
  const dobField = new Field('dob', 'Enter dob', validateDob, identity);
  const hobbiesField = new Field(
    'hobbies', 'Enter hobbies', validateHobbies, convertToList);
  const phNumField = new Field(
    'phNum', 'Enter phNum', validateNumber, identity);
  const details = new Form(nameField, dobField, hobbiesField, phNumField,);

  return details;
};

const collectDetails = () => {
  const details = createForm();

  details.displayMessage();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    details.addInfo(chunk.trim());

    if (details.areQueriesComplete()) {
      endInputStream(details.getAllDetails());
      return;
    }
    details.displayMessage();
  });
};

collectDetails();
