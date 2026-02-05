import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {

    const token = req.cookies?.accessToken
    
    if(!token) {
       return res.status(401).json({
          message: "Authentication required"
       })
    }

    try {
        const {userId, role} = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

        req.user = {
            id: userId,
            role,
        }

    next()

    } catch {

        return res.status(401).json({
            message: "invalid or expired token"
        })
    }
}

export default authenticate;