// import user //

const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");
// making a function for user signup //

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body; // taking the following things from the user //

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body; // taking the following things from the user for authentication//

  const user = await User.findOne({
    email,
    password,
  });

  if (!user)
    return res.render("login", {
      error: "Invalid username or password",
    });
  // const sessionId = uuidv4(); // THIS IS THE UNIQUE ID FOR EVERY USER //

  const token = setUser(user); 
  res.cookie("token", token); // UID IS THE NAME OF THE COOKIE WITH ID PROVIDED BY THE SESSION ID //
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
