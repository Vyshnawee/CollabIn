const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");
const { validateSignUpData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

authRouter.post("/signUp", async (req, res) => {
     try {
          //validate user
          validateSignUpData(req);
          const { firstName, lastName, email, password } = req.body;

          //encrypt
          const passwordHash = await bcrypt.hash(password, 10);

          const user = new User({
               firstName,
               lastName,
               email,
               password: passwordHash,
          });

          await user.save();
          res.send("User added successfully");
     } catch (err) {
          res.status(400).send("Error saving the user: " + err.message);
     }
});

authRouter.post("/login", async (req, res) => {
     try {
          const { email, password } = req.body;
          console.log(req.body);

          const user = await User.findOne({ email });
          if (!user) {
               throw new Error("Invalid credentials");
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
               //jwt
               const token = jwt.sign({ _id: user._id }, "DevTinder", {
                    expiresIn: "7d",
               });
               //cookie
               res.cookie("token", token, {
                    expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
               });

               res.send("Login Successfull!!!");
          } else {
               throw new Error("Invalid credentials");
          }
     } catch (err) {
          res.status(400).send("Error: " + err);
     }
});

authRouter.post("/logout", async (req, res) => {
     res.cookie("token", null, { expires: new Date(Date.now()) });
     res.send("logged out Successfull");
});

module.exports = { authRouter };
