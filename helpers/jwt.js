const expressJwt = require("express-jwt");
const config = require("../config/config");
const userService = require("../user/user.service");

module.exports = jwt;

// For giving access to tokens only
function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      "/users/authenticate",
      "/users/register",
      "/open/queries",
      "/open/appointment"
    ]
  });
}

async function isRevoked(req, payload, done) {
  console.log(payload);
  const user = await userService.getById(payload.userId);

  // revoke token if user no longer exists
  console.log(user);
  if (!user) {
    return done(null, true);
  }

  done();
}
