const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controller");
const {AuthRequestValidator} = require("../../middlewares/index");

router.post(
  "/signup",

  AuthRequestValidator.validateUserAuth,
  UserController.create
);
router.post(
  "/signin",
  AuthRequestValidator.validateUserAuth,
  UserController.Signin
);

router.get("/isAuthenticated", UserController.isAuthenticated);

module.exports = router;
