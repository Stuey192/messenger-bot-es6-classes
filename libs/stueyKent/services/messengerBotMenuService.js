var Request = require('request');

class MessengerBotMenuService {
  static setMenu(buttons) {

    let callToActions = buttons.map((button) => {
      return button.object;
    });

    Request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: process.env.page_token
      },
      method: 'POST',
      json: {
        setting_type: 'call_to_actions',
        thread_state: "existing_thread",
        call_to_actions: callToActions
      }
    });
  }
}
module.exports = MessengerBotMenuService;