const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise");

router.get("/", (req, res) => {
  Exercise.find()
    .then((result) => {
      res.render("index", { result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const task = new Exercise(req.body);
  task
    .save()
    .then((result) => {
      res.redirect("/exercises");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Exercise.findById(id)
    .then((result) => {
      res.render("details", { result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("404");
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Exercise.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/exercises" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.use((req, res) => {
  res.status(404).render("404");
});

module.exports = router;
