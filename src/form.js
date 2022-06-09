class Form {
  #fieldData;
  #index;

  constructor(...fieldData) {
    this.#fieldData = fieldData;
    this.#index = 0;
  }

  #currentField() {
    return this.#fieldData[this.#index];
  }

  getCurrentPrompt() {
    return this.#currentField().getPrompt();
  }

  areQueriesComplete() {
    return this.#fieldData.every((field) => field.isFilled());
  }

  addInfo(response) {
    if (this.#currentField().isValid(response)) {
      this.#currentField().fillField(response);
      if (this.#currentField().isFilled()) {
        this.#index++;
      }
      return;
    }
    throw new Error('Invalid Response');
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
