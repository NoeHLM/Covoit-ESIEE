import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const signup = async (req, res) => {
  const {
    userPhone,
    userPassword,
    userFirstname,
    userLastname,
    userConfirmPassword,
  } = req.body;

  try {
    if (userPhone === "" || userFirstname === "" || userLastname === "") {
      return res
        .status(400)
        .send({ message: "Veuillez remplir tous les champs." });
    }
    if (userPassword !== userConfirmPassword) {
      return res
        .status(400)
        .send({ message: "Les mots de passe ne correspondent pas." });
    }
    const existingUser = await User.findOne({ phone: userPhone });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Le numéro de téléphone est déjà utilisée." });
    }
    if (userPassword.length < 6) {
      return res
        .status(400)
        .send({ message: "Le mot de passe doit contenir au moins 6 caractères." });
    }
    if (!userPhone.match(/^(0[1-9]\d{8})$/)) {
      return res
        .status(400)
        .send({ message: "Le numéro de téléphone est invalide." });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new User({
      firstname: userFirstname,
      lastname: userLastname,
      phone: userPhone,
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

export const login = async (req, res) => {
  const { userPhone, userPassword } = req.body;

  try {
    const user = await User.findOne({ phone: userPhone });

    if (!user) {
      return res.status(404).send({ message: "L'utilisateur n'existe pas" });
    }

    const passwordMatch = await bcrypt.compare(userPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Mot de passe incorrect" });
    }

    const options = { expiresIn: "3h" };
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_JWT_KEY,
      options
    );
    const refreshToken = generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).send({
      message: "Connexion réussie.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Une erreur s'est produite lors de la connexion." });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const user = await User.findOne({ refreshToken: refreshToken });

    if (!user) {
      return res.status(401).send({ message: "Refresh token invalide" });
    }

    const options = { expiresIn: "3h" };
    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_JWT_KEY,
      options
    );

    return res.status(200).send({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Erreur lors du rafraîchissement du token" });
  }
};

export const getUserLoggedData = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.SECRET_JWT_KEY);

    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getUserName = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    return res.status(200).send({ firstname: user.firstname});
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

