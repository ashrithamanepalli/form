const registerResponse = (form, response, logger, callBack) => {
  try {
    form.addInfo(response);
  } catch (error) {
    logger(error.message);
  }

  if (form.areQueriesComplete()) {
    callBack(form.getAllDetails());
    return;
  }

  logger(form.getCurrentPrompt());
};

module.exports = { registerResponse };
