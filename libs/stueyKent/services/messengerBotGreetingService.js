var Request = require('request');

class MessengerBotGreetingService {
  static greeting(text) {
    Request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: process.env.page_token
      },
      method: 'POST',
      json: {
        setting_type: 'greeting',
        greeting: {
          //text: 'Hi {{user_first_name}}, welcome to JayBot.'
          text: text
        }
      }
    });
  }
}
module.exports = MessengerBotGreetingService;