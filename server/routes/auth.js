import express from "express";
import * as passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/User";

const router = express.Router();

// Configure Passport
passport.use(
  new Strategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: "Incorrect username." });
        const isValidPassword = await bcrypt.compare(
          password,
          user.passwordHash
        );
        if (!isValidPassword)
          return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Route for Login
router.post("/login", passport.authenticate("local"), (req, res) => {
    // Generate JWT after successful authentication
    const payload = {
      username: req.user.username,
      userId: req.user._id.toString(), // or another unique identifier
    };
  
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h", // Token expiration time
    });
  
    res.json({ token });
  });

// Route for Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
      role: "chef",
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;