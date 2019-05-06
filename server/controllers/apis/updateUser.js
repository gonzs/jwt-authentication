"use strict";

const passport = require("passport");
const express = require("express");
const userService = require("../../services/admin/users");

let router = express.Router();

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userService.updateNameOrPassword
);

module.exports = router;
