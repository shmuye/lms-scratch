import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {

    const token = req.cookies?.accessToken

    if(!token) {
       return res.status(401).json({
          message: "Authentication required"
       })
    }

    try {
        const {userId, userRole} = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

        req.user = {
            id: userId,
            role: userRole
        }

    next()

    } catch {

        return res.status(401).json({
            message: "invalid or expired token"
        })
    }
}

export default authMiddleware;