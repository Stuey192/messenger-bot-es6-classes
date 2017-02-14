var Attachment = require("./attachment");

class MediaAttachment extends Attachment {
  constructor(type, url, isReusable, attachmentId) {
    super(type)

    this._url = url;
    this._isReusable = isReusable;
    this._attachmentId = attachmentId;
  }

  get url() {
    return this._url;
  }

  get isReusable() {
    return this._isReusable;
  }

  get attachmentId() {
    return this._attachmentId;
  }

  get object() {
    let obj = {
      "type": this._type,
      "payload": {}
    }

    if (this._url) {
      obj.payload.url = this._url;
      if (this._isReusable) {
        obj.payload.is_reusable = this._isReusable;
      }
    } else if (this._attachmentId) {
      obj.payload.attachment_id = this._attachmentId;
    } else {
      //error
    }

    return obj;
  }
}

module.exports = MediaAttachment;
