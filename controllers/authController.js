const login_get = (req, res) => {
  res.render("login");
};

const login_post = (req, res) => {
  res.send("temporary plain text");
};

module.exports = {
  login_get,
  login_post,
};
