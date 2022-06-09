const checkIfNotEmpty = (text) => text.length > 0;
const validateAddress = (address) => checkIfNotEmpty(address);
const validateHobbies = (hobbies) => checkIfNotEmpty(hobbies);
const validateName = (name) => /^[ A-z]+$/.test(name) && name.length >= 5;
const validateDob = (dob) => /^\d{4}-\d{2}-\d{2}$/.test(dob);
const validateNumber = (phNumber) => /^\d{10}$/.test(phNumber);

module.exports = {
  validateHobbies,
  validateName,
  validateDob,
  validateNumber,
  validateAddress
};
