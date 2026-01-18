export const roleMiddleware = (...allowedRoles) => {

    return (req,res, next) => {

        if (!req.user || !req.user.role) {
            return res.status(403).json({
                message: "Access Denied"
            })
        }

        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            })
        }

        next()
    }
}