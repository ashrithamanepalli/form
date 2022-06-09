class MultiLineField {
  #query;
  #prompt;
  #validator;
  #parser;
  #response;
  #index;

  constructor(query, prompt, validator = () => true, parser = (text) => text) {
    this.#query = query;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = [];
    this.#index = 0;
  }

  fillField(response) {
    this.#response.push(response);
    this.#index++;
  }

  isFilled() {
    return this.#response.length === this.#prompt.length;
  }

  isValid(response) {
    return this.#validator(response);
  }

  getPrompt() {
    return this.#prompt[this.#index];
  }

  getDetails() {
    return { query: this.#query, response: this.#parser(this.#response) };
  }
}

module.exports = { MultiLineField };
