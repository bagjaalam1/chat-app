const oauth = require("../../oauth");

exports.getRequestToken = async(req, res) => {

  const redirectUrl = "http://localhost:3000/oauth/callback";
  oauth.getOAuthRequestToken(
    { oauth_callback: redirectUrl },
    (err, token, secret) => {
      if (err) {
        console.error("Error getting request token:", err);
        return res
          .status(500)
          .json({ error: "Failed to get request token from Flickr" });
      }

      console.log({ token, secret });
      req.session.oauthToken = token;
      req.session.oauthTokenSecret = secret;

      // Step 2: Redirect the user to Flickr to authorize the application
      res.redirect(
        `https://www.flickr.com/services/oauth/authorize?oauth_token=${token}`
      );
    }
  );
};

exports.getAccessToken = (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
  const { oauthTokenSecret } = req.session;

  console.log({ oauth_token, oauth_verifier, oauthTokenSecret });

  oauth.getOAuthAccessToken(
    oauth_token,
    oauthTokenSecret,
    oauth_verifier,
    (err, access_token, access_token_secret, results) => {
      if (err) {
        console.error("Error getting access token:", err);
        return res
          .status(500)
          .json({ error: "Failed to get access token from Flickr" });
      }

      console.log({ access_token, access_token_secret });
      console.log({ results });
      return res.json({ access_token, access_token_secret });
    }
  );
};
