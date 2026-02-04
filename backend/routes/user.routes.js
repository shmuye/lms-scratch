import express from 'express';
const router = express.Router();

import { createUserByAdmin, getAllUsers, getUserById, getMe, getUserBorrows, updateProfile,  deleteUser } from '../controllers/user.controllers.js';
import { authenticate , authorize } from "../middleware/index.js";
import { PERMISSIONS } from '../constants/permissions.js';

router.post('/', authenticate, authorize(PERMISSIONS.USER_CREATE), createUserByAdmin);
router.get('/', authenticate, authorize(PERMISSIONS.USER_READ), getAllUsers);
router.get('/me/borrows', authenticate, getUserBorrows);
router.get('/me', authenticate, getMe);
router.patch('/me', authenticate, updateProfile);

router.get('/:id', authenticate, authorize(PERMISSIONS.USER_READ), getUserById);
router.delete('/:id', authenticate, authorize(PERMISSIONS.USER_DELETE), deleteUser);


export default router;