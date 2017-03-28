var Request = require('request');

class MessengerBotGetStartedService {
  static getStarted(payload) {
    Request({
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
      qs: {
        access_token: process.env.page_token
      },
      method: 'POST',
      json: {
        setting_type: 'call_to_actions',
        thread_state: 'new_thread',
        call_to_actions: [
          {
            payload: payload
          }
        ]
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
module.exports = MessengerBotGetStartedService;