const OAuth = require('oauth');

const FLICKR_API_KEY = 'dd6692ba7066cb57a33779e6e49679d4';
const FLICKR_API_SECRET = '348de1b30e5ddee8';

const oauth = new OAuth.OAuth(
  'https://www.flickr.com/services/oauth/request_token',
  'https://www.flickr.com/services/oauth/access_token',
  FLICKR_API_KEY,
  FLICKR_API_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

module.exports = oauth;