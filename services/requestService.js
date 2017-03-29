var Request = require('request');

class MessengerBotRequestService {
  static makeRequest(request) {

    return new Promise(function (resolve, reject) {
      Request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
          access_token: process.env.page_token
        },
        method: 'POST',
        json: request
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending message: ', error);
        } else if (response) {
          if(body.error){
            console.log('Error: ', response.body.error);
          } else {
            resolve(body);
          }
        }
      });
    });
  }
}
module.exports = MessengerBotRequestService;



