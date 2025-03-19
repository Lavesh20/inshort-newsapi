const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/database");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Import Routes & Models
const adminRoutes = require("./routes/adminRoutes");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require('./routes/userRoutes');
const Admin = require("./models/Admin");

dotenv.config();
connectDB();
require("./config/passportConfig");

const app = express();

// 🛡️ CORS Configuration to Allow Frontend Access
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies & authentication headers
  })
);

// 📦 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🏗️ Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🌍 Routes
app.use("/api/admin", adminRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/user', userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to your Express application" });
});

//🎯 Google OAuth Callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Generate JWT token upon successful authentication
    const token = jwt.sign(
      { userId: req.user.id, email: req.user.email },
      process.env.JWT_SECRET || "jwt_secret_key",
      { expiresIn: "1h" }
    );

    // Redirect user to frontend with token
    res.redirect(`http://localhost:3000/auth-success?token=${token}`);
  }
);

// 🚀 One-Time Admin Creation or Update Password
const createOrUpdateAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newAdmin = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });

      await newAdmin.save();
      console.log("Admin account created successfully!");
    } else {
      // Check if the admin password has changed
      const isMatch = await bcrypt.compare(process.env.ADMIN_PASSWORD, existingAdmin.password);
      if (!isMatch) {
        console.log("🔄 Updating Admin Password...");
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        existingAdmin.password = hashedPassword;
        await existingAdmin.save();
        console.log("Admin password updated successfully!");
      } else {
        console.log("Admin already exists, skipping creation.");
      }
    }
  } catch (error) {
    console.error("Error creating/updating admin:", error);
  }
};

// 🔥 Start Server After Admin Check
const startServer = async () => {
  await createOrUpdateAdmin();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
