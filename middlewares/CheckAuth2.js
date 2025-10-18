import jwt from 'jsonwebtoken';
import { User } from '../models/auth.model.js';

export const CheckAuth2 = async (req, res, next) => {
  try {
    // ✅ Get token from cookies instead of header
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    if (!decoded?.userId) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const findUser = await User.findById(decoded.userId).select('-password');
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if(findUser.role!=="admin"){
        return res.status(400).json({message:"Only admin allowed"})
    }

    // ✅ Attach user to request
    req.user = findUser;

    next();
  } catch (error) {
    console.error("CheckAuth error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
