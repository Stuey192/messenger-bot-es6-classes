/*
  title has a 20 character limit, after that it gets truncated
  payload has a 1000 character limit
  If content_type is location, title and payload are not used
  Image for image_url should be at least 24x24 and will be cropped and resized
*/

class QuickReply {
  constructor(contentType, title, payload, imageUrl) {
    this._contentType = contentType;
    this._title = title;
    this._payload = payload;
    this._imageUrl = imageUrl;
  }

  get contentType() {
    return this._contentType;
  }

  get title() {
    return this._title;
  }

  get payload() {
    return this._payload;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  get object() {
    let obj = {
      "content_type": this._contentType,
      "title": this._title,
      "payload": this._payload,
      "image_url": this._imageUrl
    }

    return obj;
  }
}

QuickReply.contetTypes = {
  "text": "text",
  "location": "location"
};


module.exports = QuickReply;
