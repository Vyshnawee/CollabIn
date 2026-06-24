const validate = require("validator");

const validateSignUpData = (req) => {
     const { firstName, lastName, email, password } = req.body;
     if (!firstName || !lastName) {
          throw new Error("Enter Your name");
     } else if (!validate.isEmail(email)) {
          throw new Error("Enter valid email");
     } else if (!validate.isStrongPassword(password)) {
          throw new Error("Enter strong password");
     }
};

const validateEditProfileData = (req) => {
     const allowedEditFields = [
          "firstName",
          "lastName",
          "age",
          "emailId",
          "photoUrl",
          "gender",
          "about",
          "skills",
     ];

     const isEditAllowed = Object.keys(req.body).every((field) =>
          allowedEditFields.includes(field),
     );
     return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
