"use strict";

const passport = require("passport");
const express = require("express");
const userService = require("../../services/admin/users");

let router = express.Router();

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userService.deleteUser
);

module.exports = router;
