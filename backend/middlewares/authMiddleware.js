import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, Login Again' });
    }

    try {
        // 1. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 2. Find the company and attach to the request object
        req.company = await Company.findById(decoded.id).select('-password');
        
        // 3. Move to the next middleware/route handler
        next();

    } catch (error) {
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};