var Request = require('request');

class GetUserDetailsService {
  static getUserDetails(userData, userId) {
    return new Promise(function (resolve, reject) {

      let userDetails = userData[userId];

      if(userDetails){
        resolve(userData);
      } else {
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
              userData[userId] = JSON.parse(body);
              resolve(userData);
            }
          }
        });
      }
    });
  }
}
module.exports = GetUserDetailsService;