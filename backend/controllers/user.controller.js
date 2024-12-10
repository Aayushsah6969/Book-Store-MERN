import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY; // Secret key for JWT

// Helper function to generate verification token
const generateVerificationToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};

// Sign-up function
export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Data validation
        if (!fullname || typeof fullname !== 'string' || fullname.trim().length < 3) {
            return res.status(400).json({ message: "Invalid fullname. Must be at least 3 characters." });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password and create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: hashedPassword });

        // Generate verification token
        const verificationToken = generateVerificationToken(newUser._id);
        newUser.verificationToken = verificationToken;

        // Save the user with isVerified: false
        await newUser.save();

        // Send verification email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const verificationLink = `http://localhost:3000/user/verify-email?token=${verificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Verify your email',
            text: `Please verify your email by clicking on the following link: ${verificationLink}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "User created successfully. Please verify your email." });
    } catch (error) {
        console.error("Error", error.message);
        res.status(500).json("Error",error,{ message: "Error creating user." });
    }
};

// Email verification function
export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified.' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: 'Invalid or expired token.' });
    }
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password." });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist." });
        }

        if (!existingUser.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in." });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password." });
        }

        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email, isAdmin: existingUser.isAdmin },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Login successful",
            user: existingUser,
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error during login." });
    }
};


export const allUsers = async (req,res)=>{
    try {
        const users = await User.find().select('-password');;
        res.status(200).json(users);
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Update user (e.g., to make isAdmin: true)
export const updateUsers = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, // Use $set to update fields explicitly
            { new: true, runValidators: true } // Return the updated user
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Error: " + error.message }); // Send proper error response
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Error: " + error.message });
    }
};

export const emailotp = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || !email.isVerified) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a 6-digit OTP
      const otp = crypto.randomInt(100000, 999999);
  
      // Save the OTP in the user's document (or in a separate collection)
      user.resetOtp = otp;
      user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
      await user.save();
  
      // Send OTP via email (using nodemailer)
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or another mail service
        auth: {
          user: process.env.EMAIL_USER, // your email
          pass: process.env.EMAIL_PASS, // your email password
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Your Password Reset OTP',
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  };

  export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || user.resetOtp !== parseInt(otp) || user.resetOtpExpires < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
  
      // Generate a token with userID, OTP, and email
      const token = jwt.sign(
        { userId: user._id, email: user.email, otp },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // Valid for 15 minutes
      );
  
      res.status(200).json({ token, message: 'OTP verified successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  };

  export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user || decoded.otp !== user.resetOtp) {
        return res.status(400).json({ message: 'Invalid token or OTP' });
      }
  
      // Update password and reset OTP fields
      user.password = newPassword;
      user.resetOtp = null;
      user.resetOtpExpires = null;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to reset password' });
    }
  };
  