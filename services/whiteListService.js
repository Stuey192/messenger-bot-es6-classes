var Request = require('request');

class WhiteListService {
  static makeRequest(domains) {
    Request({
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
      qs: {
        access_token: process.env.page_token
      },
      method: 'POST',
      json: {
        setting_type: 'domain_whitelisting',
        whitelisted_domains: domains,
        domain_action_type: "add"
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
module.exports = WhiteListService;