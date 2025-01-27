// const sessionIdToUserMap = new Map(); // A MAP TO STORE SESSION IDS AND USER INFO // // USED FOR STATEFULL AUTH

// FOR STATELESS AUTH //
const jwt = require("jsonwebtoken");
const secret = "";

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user); // stores the user info with session ID as key //
// }

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  ); // stores the user info with session ID as key //
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret); // RETREIVE THE INFORMATION ASSOCIATED WITH THE GIVEN USER ID //
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
