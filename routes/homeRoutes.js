const express = require("express");
const homeController = require("../controllers/homeController");
const router = express.Router();

router.get("/", homeController.home_index);
router.get("/:id", homeController.home_details);

module.exports = router;
