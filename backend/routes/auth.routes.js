import express from 'express';
const router = express.Router();

import {signUp, signIn, logout, refresh} from '../controllers/auth.controllers.js'

router.post('/register', signUp)
router.post('/login', signIn)
router.post('/logout', logout)
router.post('/refresh', refresh)

export default router;