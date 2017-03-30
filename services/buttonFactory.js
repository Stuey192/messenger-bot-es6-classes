const Mustache = require('mustache');

const CallButton = require("../libs/stueyKent/messengerBot/buttons/callButton");
const UrlButton = require("../libs/stueyKent/messengerBot/buttons/urlButton");
const PostbackButton = require("../libs/stueyKent/messengerBot/buttons/postbackButton");
const ShareButton = require("../libs/stueyKent/messengerBot/buttons/shareButton");

class ButtonFactory {
  static getButton(button, userDetails){
    switch (button.type) {
      case "URL":
        return new UrlButton(Mustache.render(button.text, userDetails), button.url, UrlButton.webViewHeightRatios[button.size]);

      case "CALL":
        return new CallButton(Mustache.render(button.text, userDetails), button.number);

      case "POSTBACK":
        return new PostbackButton(Mustache.render(button.text, userDetails), button.payload);

      case "SHARE":
        return new ShareButton();
    }

  }
}
module.exports = ButtonFactory;