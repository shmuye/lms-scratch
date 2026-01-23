import { ROLES } from "../config/roles.js";
import { PERMISSIONS } from "../config/permissions.js";

const permissionMiddleware = (...requiredPermissions) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userPermissions = ROLES[userRole] || [];

    // Admin shortcut
    if (userPermissions.includes(PERMISSIONS.SYSTEM_ALL)) {
      return next();
    }

    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export default permissionMiddleware;
