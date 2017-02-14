/*
  message or sender_action must be set
  notification_type details: REGULAR will emit a sound/vibration and a phone notification; SILENT_PUSH will just emit a phone notification, NO_PUSH will not emit either
  notification_type is optional; by default, messages will be REGULAR push notification type

*/

class Request {
  constructor(recipient, message, senderActions, notificationType = "REGULAR") {
    this._recipient = recipient;
    this._message = message;
    this._senderActions = senderActions;
    this._notificationType = notificationType;
  }

  get recipient() {
    return this._recipient;
  }

  get message() {
    return this._message;
  }

  get senderActions() {
    return this._senderActions;
  }

  get notificationType() {
    return this._notificationType;
  }

  get object() {
    let obj = {
      "recipient": this.recipient.object,
      "notification_type": this._notificationType
    }

    if (this._message) {
      obj.message = this._message.object;
    } else if (this._senderActions) {
      obj.sender_action = this._senderActions;
    } else {
      //error
    }

    return obj;
  }
}

Request.senderActions = {
  "typingOn": "typing_on",
  "typingOff": "typing_off",
  "markSeen": "mark_seen",
};

Request.notificationTypes = {
  "regular": "REGULAR",
  "silentPush": "SILENT_PUSH",
  "noPush": "NO_PUSH",
};

module.exports = Request;
