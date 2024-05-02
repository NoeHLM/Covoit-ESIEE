import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    try {
      let saltRounds = 10;
      let { email, firstname, lastname, password } = req.body;
      password = bcrypt.hashSync(password, saltRounds);
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const user = new User({ email, firstname, lastname , password });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send(error);
      console.error(error);
    }
};
  