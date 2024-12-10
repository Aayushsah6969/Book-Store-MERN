import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';  // Assuming you have a User model

dotenv.config();

export const isAdminMiddleware = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    const token = req.headers.authorization?.split(' ')[1]; // Expecting 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Check if the decoded token contains a valid userId
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is an admin
        if (user.isAdmin) {
            // If the user is an admin, allow access to the route
            next();
        } else {
            // If the user is not an admin, deny access
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
