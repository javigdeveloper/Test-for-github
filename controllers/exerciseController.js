// exercise_index
const Exercise = require("../models/exercise");

const exercise_index = (req, res) => {
  Exercise.find()
    .then((result) => {
      res.render("exercises/index", { result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const exercise_details = (req, res) => {
  const id = req.params.id;
  Exercise.findById(id)
    .then((result) => {
      res.render("exercises/details", { result });
    })
    .catch((err) => {
      res.status(404).render("404");
    });
};

const exercise_create_get = (req, res) => {
  res.render("exercises/create");
};

const exercise_create_post = (req, res) => {
  const task = new Exercise(req.body);
  task
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

const exercise_delete = (req, res) => {
  const id = req.params.id;
  Exercise.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/admin" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  exercise_index,
  exercise_details,
  exercise_create_get,
  exercise_create_post,
  exercise_delete,
};
