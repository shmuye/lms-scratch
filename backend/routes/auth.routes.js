import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema } from "../../shared/validations/auth.schema.js";
import { loginSchema } from "../../shared/validations/auth.schema.js";

import {
  signUp,
  signIn,
  logout,
  refresh,
  verifyEmail,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", validate(registerSchema), signUp);
router.post("/login", validate(loginSchema), signIn);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/verify-email", verifyEmail);
export default router;
