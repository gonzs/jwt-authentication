"use strict";

const registerController = require("../../controllers/apis/register");
const loginController = require("../../controllers/apis/login");
const dashboardController = require("../../controllers/apis/dashboard");
const getUsersController = require("../../controllers/apis/getUsers");
const deleteUserController = require("../../controllers/apis/deleteUser");
const updateUserController = require("../../controllers/apis/updateUser");
const express = require("express");

let router = express.Router();

router.use("/register", registerController);
router.use("/login", loginController);
router.use("/dashboard", dashboardController);
router.use("/users", getUsersController);
router.use("/user/", deleteUserController);
router.use("/user/", updateUserController);

module.exports = router;
