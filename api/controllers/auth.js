const userSchema = require("../models/user");
require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User", userSchema);

exports.register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      ...req.body,
      password: hash,
    });

    res.status(201).send("User created successfully");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(
        createError(400, `Username ${req.body.username} is not found`)
      );

    if (!user.password) return next(createError(400, `password required!!`));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, `Password is incorrect`));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: {...otherDetails}, __v: undefined, isAdmin });
  } catch (err) {
    next(err);
  }
};
