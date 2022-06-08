class Form {
  #fieldData;
  #index;

  constructor(...fieldData) {
    this.#fieldData = fieldData;
    this.#index = 0;
  }

  currentField() {
    return this.#fieldData[this.#index];
  }

  displayMessage() {
    console.log(this.currentField().getPrompt());
  }

  areQueriesComplete() {
    return this.#index >= this.#fieldData.length;
  }

  addInfo(response) {
    if (this.currentField().isValid(response)) {
      this.currentField().fillField(response);
      this.#index++;
      return;
    }
    console.log('Invalid response');
  }

  getAllDetails() {
    const entries = {};
    this.#fieldData.forEach((field) => {
      const { query, response } = field.getDetails();
      entries[query] = response;
    });
    return entries;
  }
}

exports.Form = Form;
