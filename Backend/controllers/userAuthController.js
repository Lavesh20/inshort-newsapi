// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const userSignup = async (req, res) => {
//   try {
//     const { fullName, email, password, agreeToTerms } = req.body;

//     if (!fullName || !email || !password || !agreeToTerms) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // ✅ Enforce Strong Password Rules
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
//       });
//     }

//     let existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     const newUser = new User({ fullName, email, password, agreeToTerms });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // 🟢 Login User
// const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// module.exports = { userSignup, userLogin };

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSignup = async (req, res) => {
  try {
    const { fullName, email, password, agreeToTerms } = req.body;

    if (!fullName || !email || !password || agreeToTerms === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ Ensure email is unique
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // ✅ Enforce strong password rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
      });
    }

    // ✅ Save the user
    const newUser = new User({ fullName, email, password, agreeToTerms });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🟢 Login User
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { userSignup, userLogin };
