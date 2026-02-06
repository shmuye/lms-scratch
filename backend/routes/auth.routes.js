import express from 'express';
const router = express.Router();
import { validate } from '../middleware/validate.middleware.js';
import { registerSchema } from '../../shared/validations/auth.schema.js';
import { loginSchema } from '../../shared/validations/auth.schema.js';

import {signUp, signIn, logout, refresh} from '../controllers/auth.controllers.js'

router.post('/register', validate(registerSchema), signUp)
router.post('/login', validate(loginSchema), signIn)
router.post('/logout', logout)
router.post('/refresh', refresh)

export default router;