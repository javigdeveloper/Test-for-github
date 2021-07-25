const login_get = (req, res) => {
  res.render("login");
};

const login_post = (req, res) => {
  res.send("temporary plain text for login page");
};

const signup_get = (req, res) => {
  res.render("signup");
};

const signup_post = (req, res) => {
  res.send("temporary plain text for sign up page");
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
};
