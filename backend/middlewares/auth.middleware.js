import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const auth = async(req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // Grab the token from headers (taking the "Bearer" string)
  const token = authorization.split(" ")[1]

  try {
    // Decode and extract the user id from token
    const {_id} = jwt.verify(token, process.env.SECRET)

    // Save the user in request
    req.user = await User.findById(_id).select("_id")

    next()
  } catch (error) {
    res.status(401).json({error: error.message})
  }


};

export default auth