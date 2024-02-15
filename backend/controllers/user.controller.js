import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import 'dotenv/config.js'


/************************ Creating JWT *************************/
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '10d'})
}






/************************ Register User *************************/
const registerUser = async (req, res) => {
  //Grab data from request
  const { name, email, password } = req.body;

  // Check the fields are not empty
  if (!name || !email || !password) {
    res.send(400).json({ error: "All fields are required." });
  }

  // Check if user already exists
  const exist = await User.findOne({ email });

  if (exist) {
    return res.status(400).json({ error: "User already exists." });
  }

  // Hash the password
  const salt = await bcrypt.genSalt();
  const hasedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hasedPassword,
    });

    //creating jwt

    const token = createToken(user._id)

    // send the response
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/************************ Login User *************************/

const loginUser = async (req, res) => {
  //Grab data from request
  const { email, password } = req.body;

  // Check the fields are not empty
  if (!email || !password) {
    res.send(400).json({ error: "All fields are required." });
  }

  // Check if user already exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Incorrect email." });
  }

  // check password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ error: "Incorrect Password" });
  }

  try {
    //creating jwt

    const token = createToken(user._id)
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
