const express = require("express");
const { indexView } = require("../controllers/dashboardController");
const router = express.Router();

router.get("/", indexView);

module.exports = router;
