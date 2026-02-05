import express from 'express';
const router = express.Router();

import { uploadAvatar } from '../utils/multer.js';


import { createUserByAdmin, getAllUsers, getUserById, getMe, getUserBorrows, updateProfile,  deleteUser, deleteAvatar, updateAvatar } from '../controllers/user.controllers.js';
import { authenticate , authorize } from "../middleware/index.js";
import { PERMISSIONS } from '../constants/permissions.js';

router.post('/', authenticate, authorize(PERMISSIONS.SYSTEM_ALL), createUserByAdmin);
router.get('/', authenticate, authorize(PERMISSIONS.USER_READ), getAllUsers);
router.get('/me/borrows', authenticate, getUserBorrows);
router.get('/me', authenticate, getMe);
router.patch('/me', authenticate, updateProfile);
router.patch('/me/avatar',authenticate, uploadAvatar.single('avatar'), updateAvatar)

router.get('/:id', authenticate, authorize(PERMISSIONS.USER_READ), getUserById);
router.delete('/:id', authenticate, authorize(PERMISSIONS.USER_DELETE), deleteUser);
router.delete('/me/avatar',authenticate, deleteAvatar)


export default router;