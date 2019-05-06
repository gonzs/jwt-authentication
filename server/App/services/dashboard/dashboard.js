"use strict";

function getDashboard(request, response) {
  setTimeout(
    () =>
      response.json({
        success: true,
        message: "This is from " + request.user.role + " dashboard"
      }),
    3000
  );
}

module.exports = {
  getDashboard: getDashboard
};
