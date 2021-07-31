const express = require("express");
const exerciseController = require("../controllers/exerciseController");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", exerciseController.exercise_index);
router.get("/create", requireAuth, exerciseController.exercise_create_get);
router.post("/create", exerciseController.exercise_create_post);
router.get("/:id", exerciseController.exercise_details);
router.delete("/:id", exerciseController.exercise_delete);

module.exports = router;
