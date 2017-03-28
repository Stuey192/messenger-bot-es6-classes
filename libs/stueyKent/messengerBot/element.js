/*
 title has a 80 character limit
 subtitle has a 80 character limit
 buttons is limited to 3
 Image ratio is 1.91:1
 */

class Element {
  constructor(title, subtitle, imageUrl, defaultAction, buttons) {
    this._title = title;
    this._subtitle = subtitle;
    this._imageUrl = imageUrl;
    this._defaultAction = defaultAction;
    this._buttons = buttons;
  }

  get title() {
    return this._id;
  }

  get subtitle() {
    return this._subtitle;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  get defaultAction() {
    return this._defaultAction;
  }

  get buttons() {
    return this._buttons;
  }

  get object() {
    let obj = {
      "title": this._title
    }

    if (this._subtitle) {
      obj.subtitle = this._subtitle;
    }

    if (this._imageUrl) {
      obj.image_url = this._imageUrl;
    }

    if (this._defaultAction) {
      obj.default_action = this._defaultAction.object;
    }


    if (this._buttons) {
      if (this._buttons.length) {
        obj.buttons = this._buttons.map((button) => {
          return button.object;
        });
      }
    }

    return obj;
  }
}

module.exports = Element;
