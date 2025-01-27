// THIS IS A MIDDLEWARE THAT CHECKS WHETHER THE USER HAS A UNIQUE ID OR NOT //

// const { generate } = require("shortid");
const { getUser } = require("../service/auth");

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;

//   if (!userUid) return res.redirect("/login"); // if a user id iss not present in the cookies , means the user is not logged in

//   const user = getUser(userUid); // gets the user info and returns null when no user is found
//   if (!user) return res.redirect("/login"); // if no user is found , it redirects to login page

//   req.user = user; // when a user is found //
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;

//   const user = getUser(userUid); // gets the user info and returns null when no user is found

//   req.user = user; // when a user is found //
//   next();
// }

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null; 

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token); // get user functions verifies the token and sends the user //

  req.user = user;
  return next();
} // CHECKS FOR THE AUTHENTICATION //

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized Access");

    return next();
  };
} // CHECKS FOR THE AUTHORIZATION //
module.exports = {
  checkForAuthentication,
  restrictTo,
};
