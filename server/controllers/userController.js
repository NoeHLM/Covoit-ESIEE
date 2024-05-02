import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
  };

export const signup = async (req, res) => {
    const {
        userMail,
        userPassword,
        userFirstname,
        userLastname,
    } = req.body;
  
    try {
      const existingUser = await User.findOne({ email: userMail });
      if (existingUser) {
        return res
          .status(400)
          .send({ message: "L'adresse e-mail est déjà utilisée." });
      }
      const hashedPassword = await bcrypt.hash(userPassword, 10);
  
      const newUser = new User({
        firstname: userFirstname,
        lastname: userLastname,
        email: userMail,
        password: hashedPassword,
        create_at: new Date(),
        refreshToken: generateRefreshToken(),
      });
  
      await newUser.save();
      return res
        .status(200)
        .send({ message: "Utilisateur créé avec succès.", userData: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message:
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    }
  };
