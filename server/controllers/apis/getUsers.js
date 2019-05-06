"use strict";

const passport = require("passport");
const express = require("express");
const userService = require("../../services/admin/users");

let router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userService.getUsers
);

module.exports = router;
