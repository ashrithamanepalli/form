const fs = require('fs');
const { registerResponse } = require('./src/fillForm.js');
const { createForm } = require('./src/createUserDetailsForm.js');

const endInputStream = (details) => {
  console.log('Thank You');
  fs.writeFileSync('./src/form.json', JSON.stringify(details), 'utf8');
  process.stdin.destroy();
};

const main = () => {
  const form = createForm();

  console.log(form.getCurrentPrompt());
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) =>
    registerResponse(form, chunk.trim(), console.log, endInputStream));
};

main();
