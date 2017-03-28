var Attachment = require("../attachment");

class ButtonTemplate extends Attachment {
  constructor(text, buttons) {
    super("template")
    this._templateType = "button";
    this._text = text;
    this._buttons = buttons;
  }

  get templateType() {
    return this._templateType;
  }

  get text() {
    return this._text;
  }

  get buttons() {
    return this._buttons;
  }

  get object() {
    let obj = {
      "type": this._type,
      "payload": {
        "template_type": this._templateType,
        "text": this._text,
        "buttons": []
      }
    }

    if (this._buttons) {
      if (this._buttons.length) {
        obj.payload.buttons = this._buttons.map((button) => {
          return button.object;
        });
      }
    }

    return obj;
  }
}

module.exports = ButtonTemplate;
