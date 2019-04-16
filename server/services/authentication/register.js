"use strict";

const User = require("../../models/User");
const cons = require("../../../configs/constants");
const httpResponse = cons.httpResponse;
const emailPattern = cons.emailPattern;
const passwordPattern = cons.passwordPattern;

// Register new users
function registerUser(request, response) {
  let { email, password } = request.body;

  // Validations
  if (!email || !password)
    return response.json(httpResponse.onMandatoryFieldsError);

  if (password.length > 12 || password.length < 6)
    return response.json(httpResponse.onPasswordLengthError);

  if (!email.match(emailPattern))
    return response.json(httpResponse.onEmailRegExError);

  if (!password.match(passwordPattern))
    return response.json(httpResponse.onPasswordRegExError);

  // Attempt to save the user
  let newUser = new User({
    email: email,
    password: password
  });

  newUser.save(error => {
    if (error) {
      return response.json(httpResponse.onEmailExistsError);
    }
    response.json(httpResponse.onUserSaveSuccess);
  });
}

module.exports = {
  registerUser: registerUser
};
