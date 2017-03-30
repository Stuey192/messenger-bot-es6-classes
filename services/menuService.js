var Request = require('request');

class MenuService {
  static setMenu(buttons) {

    let callToActions = buttons.map((button) => {
      return button.object;
    });

    Request({
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
      qs: {
        access_token: process.env.page_token
      },
      method: 'POST',
      json: {
        setting_type: 'call_to_actions',
        thread_state: "existing_thread",
        call_to_actions: callToActions
      }
    }, function (error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response) {
        console.log(body);
      }
    });
  }
}
module.exports = MenuService;