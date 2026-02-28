// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const router = express.Router();

// router.post("/signup", async (req, res) => {
//   const { fullName, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       fullName,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();

//     const { password: _, ...userData } = user.toObject();

//     res.status(201).json({
//       message: "User created successfully",
//       user: userData,
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const { password: _, ...userData } = user.toObject();

//     res.status(200).json({
//       message: "Login successful",
//       user: userData,
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashed,
    });

    const { password: _, ...userData } = user.toObject();
    res.status(201).json({ user: userData });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid password" });

    const { password: _, ...userData } = user.toObject();
    res.json({ user: userData });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/push-token", async (req, res) => {
  try {
    const { userId, token } = req.body;
    await User.findByIdAndUpdate(userId, { pushToken: token });
    res.json({ message: "Token saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving token" });
  }
});


module.exports = router;
