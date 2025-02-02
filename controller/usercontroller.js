const User = require("../models/usermodel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// for Singup user
const singup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashpassword });

    await user.save();
    res.status(201).json({ message: "User registered!!!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// for Singin user

const singin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { singin, singup };
