import express from 'express';
const router = express.Router();

import { createUserByAdmin, getAllUsers, getUserById, getMe, getUserBorrows, updateProfile,  deleteUser } from '../controllers/user.controllers.js';
import { authenticate , authorize } from "../middleware/index.js";

router.post('/', authenticate, authorize("USER_MANAGE"), createUserByAdmin);
router.get('/', authenticate, authorize("USER_MANAGE"), getAllUsers);
router.get('/:id', authenticate, authorize("USER_MANAGE"), getUserById);
router.delete('/:id', authenticate, authorize("USER_MANAGE"), deleteUser);
router.get('/me/borrows', authenticate, getUserBorrows);
router.get('/me', authenticate, getMe);
router.patch('/me', authenticate, updateProfile);

export default router;