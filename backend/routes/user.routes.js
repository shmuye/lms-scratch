import express from 'express';

const router = express.Router();

import { createUserByAdmin, getAllUsers, getUserById, getMe, getUserBorrows, updateProfile,  deleteUser } from '../controllers/user.controllers.js';
import { ROLES } from '../constants/roles.js';
import { authMiddleware, permissionMiddleware } from "../middleware/index.js";

router.post('/', authMiddleware, permissionMiddleware([ROLES.ADMIN]), createUserByAdmin);
router.get('/', authMiddleware, permissionMiddleware([ROLES.ADMIN, ROLES.LIBRARIAN]), getAllUsers);
router.get('/:id', authMiddleware, permissionMiddleware([ROLES.ADMIN, ROLES.LIBRARIAN]), getUserById);
router.delete('/:id', authMiddleware, permissionMiddleware([ROLES.ADMIN]), deleteUser);
router.get('/me/borrows', authMiddleware, getUserBorrows);
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateProfile);

export default router;