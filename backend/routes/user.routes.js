import express from 'express';
const router = express.Router();

import {signUp, signIn, logout} from '../controllers/auth.controllers.js'

router.post('/register', signUp)
router.post('/login', signIn)
router.post('/logout', logout)

export default router;