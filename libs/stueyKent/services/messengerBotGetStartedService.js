var Request = require('request');

class MessengerBotGetStartedService {
  static getStarted(payload) {
    Request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
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
    });
  }
}
module.exports = MessengerBotGetStartedService;