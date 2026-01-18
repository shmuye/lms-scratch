import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {

    const token = req.cookies?.accessToken

    if(!token) {
       return res.status(401).json({
          message: "Authentication required"
       })
    }

    try {
        const {userId, role} = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

    } catch {


    }
}