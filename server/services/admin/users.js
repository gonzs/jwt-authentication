"use strict";

const User = require("../../models/User");
const { ObjectId } = require("mongodb");
const cons = require("../cons");
const httpResponse = cons.httpResponse;
const passwordPattern = cons.passwordPattern;

function getUsers(request, response) {
  if (request.user.role !== "Admin")
    response.send(httpResponse.onAuthenticationFail);

  User.find({}, "email role name", (error, users) => {
    if (error) throw error;
    if (!users) return response.send(httpResponse.onUserNotFound);
    response.json({
      success: true,
      users: users
    });
  });
}

function deleteUser(request, response) {
  if (request.user.role !== "Admin")
    response.send(httpResponse.onAuthenticationFail);

  let id = ObjectId(request.params.id);

  User.findByIdAndDelete(id, (error, userDeleted) => {
    if (error) throw error;
    if (!userDeleted) return response.send(httpResponse.onUserNotFound);

    response.send(httpResponse.onUserDeleteSuccess);
  });
}

function updateNameOrPassword(request, response) {
  let id = ObjectId(request.params.id);
  let { name, password } = request.body;
  let user = {};

  if (request.user.role !== "Admin" && id != request.user.id)
    response.send(httpResponse.onAuthenticationFail);

  // Validations
  if (!password.match(passwordPattern))
    return response.json(httpResponse.onPasswordRegExError);

  if (name != undefined && name.length > 0) user["name"] = name;
  if (password != undefined && password.length > 0) user["password"] = password;

  User.findOneAndUpdate(
    { _id: id },
    user,
    { new: true },
    (error, userUpdated) => {
      if (error) throw error;
      if (!userUpdated) return response.send(httpResponse.onUserNotFound);

      response.send(httpResponse.onUserUdateSuccess);
    }
  );
}

module.exports = {
  getUsers: getUsers,
  deleteUser: deleteUser,
  updateNameOrPassword: updateNameOrPassword
};
