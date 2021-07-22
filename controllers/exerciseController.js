// exercise_index
const Exercise = require("../models/exercise");

const exercise_index = (req, res) => {
  Exercise.find()
    .then((result) => {
      res.render("index", { result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const exercise_details = (req, res) => {
  const id = req.params.id;
  Exercise.findById(id)
    .then((result) => {
      res.render("details", { result });
    })
    .catch((err) => {
      res.status(404).render("404");
    });
};

const exercise_create_get = (req, res) => {
  res.render("create");
};
const exercise_create_post = (req, res) => {
  const task = new Exercise(req.body);
  task
    .save()
    .then((result) => {
      res.redirect("/exercises");
    })
    .catch((err) => {
      console.log(err);
    });
};
const exercise_delete = (req, res) => {
  const id = req.params.id;
  Exercise.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/exercises" });
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
