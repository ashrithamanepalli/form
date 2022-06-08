class Field {
  #query;
  #prompt;
  #validator;
  #parser;
  #response;

  constructor(query, prompt, validator = () => true, parser = (text) => text) {
    this.#query = query;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = null;
  }

  fillField(response) {
    this.#response = response;
  }

  isValid(response) {
    return this.#validator(response);
  }

  getPrompt() {
    return this.#prompt;
  }

  getDetails() {
    return { query: this.#query, response: this.#parser(this.#response) };
  }
}

module.exports = { Field };
