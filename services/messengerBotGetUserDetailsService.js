var Request = require('request');

class MessengerBotGetUserDetailsService {
  static getUserDetails(userId) {
    return new Promise(function (resolve, reject) {
      Request({
        url: 'https://graph.facebook.com/v2.6/' + userId,
        qs: {
          access_token: process.env.page_token,
          fields: 'first_name,last_name,profile_pic,locale,timezone,gender'
        },
        method: 'GET'
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending message: ', error);
        } else if (response) {
          if(body.error){
            console.log('Error: ', response.body.error);
          } else {
            resolve(JSON.parse(body));
          }
        }
      });
    });
  }
}
module.exports = MessengerBotGetUserDetailsService;