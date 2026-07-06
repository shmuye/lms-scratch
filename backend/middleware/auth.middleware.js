import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

const authenticate = async (req, res, next) => {

    const token = req.cookies?.accessToken
    
    if(!token) {
       return res.status(401).json({
          message: "Authentication required"
       })
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "Invalid authentication token",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "Account is deactivated",
            });
        }

        req.user = {
            id: userId,
            role: user.role,
        };

        next();
    } catch {
        return res.status(401).json({
            message: "invalid or expired token",
        });
    }
}

export default authenticate;