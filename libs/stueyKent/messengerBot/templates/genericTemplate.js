var Attachment = require("../attachment");

class GenericTemplate extends Attachment {
  constructor(elements) {
    super("template")
    this._templateType = "generic";
    this._elements = elements;
  }

  get templateType() {
    return this._templateType;
  }

  get elements() {
    return this._elements;
  }

  get object() {
    let obj = {
      "type": this._type,
      "payload": {
        "template_type": this._templateType,
        "elements": []
      }
    }

    if (this._elements) {
      if (this._elements.length) {
        obj.payload.elements = this._elements.map((element) => {
          return element.object;
        });
      }
    }

    return obj;
  }
}

module.exports = GenericTemplate;
