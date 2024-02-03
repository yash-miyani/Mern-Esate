import User from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username && !password && !email) {
    return next(new ApiError(404, "Please provide all the details"));
  }
  try {
    await User.create({
      username,
      password,
      email,
    });

    res.status(201).json("User Create Successfully....!");
  } catch (error) {
    res.status(501).json(error.message);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return next(new ApiError(404, "Please provide all the details"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(new ApiError(404, "User not found!"));
    }

    const ValidPassword = bcrypt.compareSync(password, validUser.password);

    if (!ValidPassword) {
      return next(new ApiError(401, "Wrong Credentials!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true, secure: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: generatedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new ApiError(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been Deleted....!");
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been Logged Out....!");
  } catch (error) {
    next(error);
  }
};
