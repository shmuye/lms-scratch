import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { connectDB } from '../db/connectDB.js'
import { hash } from "../utils/hash.js";


dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; 
const ADMIN_NAME = process.env.ADMIN_NAME;



const createAdmin = async () => {
  try {
    await connectDB();

   
    const existingAdmin = await User.findOne({
      email: ADMIN_EMAIL,
      role: "ADMIN",
    });

    if (existingAdmin) {
      console.log("Admin already exists. No action taken.");
      process.exit(0);
    }

    
    const hashedPassword = await hash(ADMIN_PASSWORD);

    const admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'ADMIN',
    });

    console.log("✅ Admin user created successfully");
    
    console.log({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin", error);
    process.exit(1);
  }
};

createAdmin();
