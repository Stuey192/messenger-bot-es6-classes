var Button = require("./button");

class UrlButton extends Button {
  constructor(title, url, webViewHeightRatio = "full", messengerExtensions, fallbackUrl) {
    super("web_url");
    this._title = title;
    this._url = url;
    this._webViewHeightRatio = webViewHeightRatio;
    this._messengerExtensions = messengerExtensions;
    this._fallbackUrl = fallbackUrl;
  }

  get object() {
    let obj = {
      "type": this._type,
      "url": this._url,
      "webview_height_ratio": this._webViewHeightRatio
    }

    if (this._title) {
        obj.title = this._title;
      }

    if (this._messengerExtensions) {
      obj.messenger_extensions = this._messengerExtensions;

      if (this._fallbackUrl) {
        obj.fallback_url = this._fallbackUrl;
      }
    }

    return obj;
  }
}

UrlButton.webViewHeightRatios = {
  "compact": "compact",
  "tall": "tall",
  "full": "full"
};

module.exports = UrlButton;
