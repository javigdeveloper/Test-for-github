const Exercise = require("../models/exercise");

const home_index = (req, res) => {
  Exercise.find()
    .then((result) => {
      // res.send("Hey");
      res.render("index", { result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const home_details = (req, res) => {
  const id = req.params.id;
  Exercise.findById(id)
    .then((result) => {
      res.render("details", { result });
    })
    .catch((err) => {
      res.status(404).render("404");
    });
};

module.exports = {
  home_index,
  home_details,
};
