const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controller"); // Corrected require statement

router.post("/signup", UserController.create);

module.exports = router;
