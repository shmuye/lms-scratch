import express from 'express';

const router = express.Router();

import { createUserByAdmin, getAllUsers, getUserById, getMe, getUserBorrows, updateProfile,  deleteUser } from '../controllers/user.controllers.js';
import { ROLES } from '../constants/roles.js';
import { authMiddleware, permissionMiddleware } from "../middleware/index.js";

router.post('/', authMiddleware, permissionMiddleware("USER_MANAGE"), createUserByAdmin);
router.get('/', authMiddleware, permissionMiddleware("USER_MANAGE"), getAllUsers);
router.get('/:id', authMiddleware, permissionMiddleware("USER_MANAGE"), getUserById);
router.delete('/:id', authMiddleware, permissionMiddleware("USER_MANAGE"), deleteUser);
router.get('/me/borrows', authMiddleware, getUserBorrows);
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateProfile);

export default router;