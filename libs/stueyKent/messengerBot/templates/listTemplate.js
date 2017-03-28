var Attachment = require("../attachment");

class ListTemplate extends Attachment {
  constructor(topElementStyle, elements, button) {
    super("template")
    this._templateType = "list";
    this._topElementStyle = topElementStyle;
    this._elements = elements;
    this._button = button;
  }

  get templateType() {
    return this._templateType;
  }

  get topElementStyle() {
    return this._topElementStyle;
  }

  get elements() {
    return this._elements;
  }

  get button() {
    return this._button;
  }

  get object() {
    let obj = {
      "type": this._type,
      "payload": {
        "template_type": this._templateType,
        "top_element_style": this._topElementStyle,
        "elements": [],
        "buttons": [this._button.object]
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

ListTemplate.topElementStyles = {
  "large": "large",
  "compact": "compact"
};

module.exports = ListTemplate;
