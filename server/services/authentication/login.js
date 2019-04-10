"use strict";

const jwt = require("jsonwebtoken");
const db = require("../../../configs/db");
const User = require("../../models/User");

const httpResponse = {
  onUserNotFound: {
    success: false,
    message: "User not found."
  },
  onAuthenticationFail: {
    success: false,
    message: "Passwords did not match."
  }
};

function loginUser(request, response) {
  let { email, password } = request.body;

  User.findOne(
    {
      email: email
    },
    function(error, user) {
      if (error) throw error;

      if (!user) {
        return response.send(httpResponse.onUserNotFound);
      }

      // Check if password matches
      user.comparePassword(password, function(error, isMatch) {
        if (isMatch && !error) {
          let u = {
            _id: user._id,
            email: user.email,
            role: user.role
          };
          var token = jwt.sign(u, db.secret, {
            expiresIn: 10080
          });

          return response.json({
            success: true,
            token: "JWT " + token
          });
        }

        response.send(httpResponse.onAuthenticationFail);
      });
    }
  );
}

module.exports = {
  loginUser: loginUser
};
