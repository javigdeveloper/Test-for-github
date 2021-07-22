const express = require("express");
const exerciseController = require("../controllers/exerciseController");
const router = express.Router();

router.get("/", exerciseController.exercise_index);
router.get("/create", exerciseController.exercise_create_get);
router.post("/create", exerciseController.exercise_create_post);
router.get("/:id", exerciseController.exercise_details);
router.delete("/:id", exerciseController.exercise_delete);

module.exports = router;
