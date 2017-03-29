var Request = require('request');

class MessengerBotGreetingService {
  static greeting(text) {
    Request({
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
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
    }, function (error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response) {
        console.log(body);
      }
    });
  }
}
module.exports = MessengerBotGreetingService;