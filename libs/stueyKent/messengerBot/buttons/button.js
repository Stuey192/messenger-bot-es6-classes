class Button {
  constructor(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  get object() {
    let obj = {
      "type": this._type,
    }

    return obj;
  }
}

  module.exports = Button;
