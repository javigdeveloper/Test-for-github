const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors:
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { userName: "", password: "" };

  // duplicate error code:
  if (err.code === 11000) {
    errors.userName = "That user Name is already registered";
    return errors;
  }

  // validation errors:
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "temporary jwt secret", {
    expiresIn: maxAge,
  });
};

const login_get = (req, res) => {
  res.render("login");
};

const login_post = (req, res) => {
  res.send("temporary plain text for login page");
};

const signup_get = (req, res) => {
  res.render("signup");
};

const signup_post = async (req, res) => {
  const { userName, adminKey, password } = req.body;
  const joiningKey = "testKey";

  if (joiningKey === adminKey) {
    try {
      const user = await User.create({ userName, password });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  } else {
    res.status(400).send("you need a valid admin key");
  }
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
};
