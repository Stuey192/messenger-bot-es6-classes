/*
  phone_number or id must be set
*/

class Recipient {
  constructor(id, phoneNumber) {
    this._id = id;
    this._phoneNumber = phoneNumber;
  }

  get recipientId() {
    return this._id;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  get object() {
    let obj = {}

    if (this._id) {
      obj.id = this._id;
    } else if (this.phone_number) {
      obj.phone_number = this._phoneNumber;
    } else {
      //error
    }

    return obj;
  }
}

module.exports = Recipient;
