import User from "../model/User.js";
import jwt from "jsonwebtoken";
const generateToken = (user) => {
  console.log(user);
  return jwt.sign({ id: user._id }, "mySuperSecretKey123", {
    expiresIn: "1d",
  });
};
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exist" });
    const user = await User.create({ username, email, password });
    // or(under the hood)
    //const user = new User({ username, email, password });
    //await user.save();
    console.log(`User Created ${user}`);
    res.status(200).json({ message: "User Created" });
  } catch (err) {
    console.log(`Error in registering err:${err}`);
    res.status(500).json({ message: "User Not Created" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    if (!(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (err) {
    console.log(`error in login user $err}`);
    res.status(500).json({ msg: "Server error" });
  }
};
