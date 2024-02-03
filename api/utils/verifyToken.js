import jwt from "jsonwebtoken";
import ApiError from "./ApiError.js";

export const verifyToken = (req, _, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return next(new ApiError(401, "Unauthorized"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(new ApiError(403, "Forbidden"));

      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
