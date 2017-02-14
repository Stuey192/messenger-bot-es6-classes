/*
  text or attachment must be set
  text and attachment are mutually exclusive
  text is used when sending a text message, must be UTF-8 and has a 640 character limit
  attachment is used to send messages with images or Structured Messages
  metadata has a 1000 character limit
*/

class Message {
  constructor(text, attachment, quickReplies, metadata) {
    this._text = text;
    this._attachment = attachment;
    this._quickReplies = quickReplies;
    this._metadata = metadata;
  }

  get text() {
    return this._text;
  }

  get attachment() {
    return this._attachment;
  }

  get quickReplies() {
    return this._quickReplies;
  }

  get metadata() {
    return this._metadata;
  }

  get object() {
    let obj = {};

    if (this._text) {
      obj.text = this._text;
    } else if (this.this._attachment) {
      obj.attachment = this.this._attachment.object;
    } else {
      //error
    }

    if (this._quickReplies.length) {
      obj.quick_replies = this.quickReplies.map((quickReply) => {
        return quickReply.object;
      });
    }

    if (this._metadata) {
      obj.metadata = this._metadata;
    }


    return obj;
  }
}

module.exports = Message;
