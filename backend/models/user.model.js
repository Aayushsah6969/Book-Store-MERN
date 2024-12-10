import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false, // By default, the user is not an admin
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },  // Field for verifying user email (optional, depending on your needs)
    verificationToken: { 
        type: String 
    }, // For email verification (optional)
    resetPasswordToken: { 
        type: String 
    }, // Token used for resetting the password (JWT)
    resetPasswordExpires: { 
        type: Date 
    }, // Expiration time for reset token
    resetOtp: {
        type: Number, // Store the 6-digit OTP as a number
    },
    resetOtpExpires: {
        type: Date, // Expiry time for the OTP
    },
});

const User = mongoose.model("User", UserSchema);

export default User;
