var Button = require("./button");

class CallButton extends Button {
  constructor(title, payload) {
    super("phone_number");
    this._title = title;
    this._payload = payload;
  }

  get object() {
    let obj = {
      "type": this._type,
      "title": this._title,
      "payload": this._payload
    }

    return obj;
  }
}
  module.exports = CallButton;
