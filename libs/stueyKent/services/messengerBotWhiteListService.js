var Request = require('request');

class MessengerBotWhiteListService {
  static makeRequest(domains) {
    Request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: process.env.page_token
      },
      method: 'POST',
      json: {
        setting_type: 'domain_whitelisting',
        whitelisted_domains: domains,
        domain_action_type: "add"
      }
    });
  }
}
module.exports = MessengerBotWhiteListService;