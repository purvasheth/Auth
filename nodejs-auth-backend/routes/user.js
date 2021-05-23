const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../model/User");
const { userError, success, serverError } = require("../utils");

// reset password
router.put(
  "/reset",
  [
    check("password", "Invalid new password. Needs min 6 chars").isLength({
      min: 6,
    }),
    check("email", "Invalid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return userError(res, { errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return userError(res, {
          message: "Account for this email does not exist",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      User.findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true },
        (err, doc) => {
          if (err) throw err;
          return success(res, { message: "Password is reset successfully" });
        }
      );
    } catch (e) {
      console.log(e);
      return serverError(res, { message: "Error in password reset" });
    }
  }
);

//get info if token has not expired
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    return serverError(res, { message: "Error in fetching user" });
  }
});

// add a new user
router.post(
  "/signup",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Invalid Password. Needs min 6 chars").isLength({
      min: 6,
    }),
    check("firstname", "Invalid First Name").not().isEmpty(),
    check("lastname", "Invalid Last Name").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return userError(res, {
        errors: errors.array(),
      });
    }
    const { email, password, firstname, lastname } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return userError(res, {
          message: "Account already exists for this email",
        });
      }
      user = new User({
        firstname,
        lastname,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      // "randomString can be anything. It is used like a key for encryption"
      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
        if (err) throw err;
        return success(res, {
          token,
        });
      });
    } catch (err) {
      console.log(err.message);
      return serverError(res, { message: "User not saved" });
    }
  }
);

// login an esisting user
router.post(
  "/login",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password. Needs min 6 chars").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return userError(res, { errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return userError(res, { message: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return userError(res, {
          message: "Incorrect Password",
        });
      }
      const payload = { user: { id: user.id } };
      jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        return success(res, { token });
      });
    } catch (e) {
      console.error(e);
      return serverError({ message: "Server is not working. Try again later" });
    }
  }
);

module.exports = router;
