const httpResponse = {
  onUserNotFound: {
    success: false,
    message: "User/s not found."
  },
  onAuthenticationFail: {
    success: false,
    message: "This functionality is not available for non-admin users"
  },
  onUserDeleteSuccess: {
    success: true,
    message: "User deleted successfully."
  },
  onUserUdateSuccess: {
    success: true,
    message: "User updated successfully."
  },
  onAuthenticationFail: {
    success: false,
    message: "Passwords did not match."
  },
  onMandatoryFieldsError: {
    success: false,
    message: "Please enter email and password."
  },
  onEmailRegExError: {
    success: false,
    message: "Email is not valid"
  },
  onEmailExistsError: {
    success: false,
    message: "That email address already exists."
  },
  onPasswordLengthError: {
    success: false,
    message: "Password should constain 6 to 12 characters"
  },
  onPasswordRegExError: {
    success: false,
    message:
      "Password should constain at least one Uppercase char and one special symbol(.!#$%&'*+/=?^_`{|}~-)"
  },
  onUserSaveSuccess: {
    success: true,
    message: "Successfully created new user."
  }
};

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordPattern = /^(?=.*[.!#$%&'*+/=?^_`{|}~-])(?=.*[A-Z])[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{6,12}$/;

module.exports = {
  httpResponse: httpResponse,
  emailPattern: emailPattern,
  passwordPattern: passwordPattern
};
