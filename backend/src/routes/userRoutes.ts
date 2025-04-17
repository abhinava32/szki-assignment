import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

// Create a new user
router.post("/add-user", createUser);

// Get all users
router.get("/users", getUsers);

// Get a single user by ID
router.get("/user/:id", getUserById);

// Update a user
router.put("/update-user/:id", updateUser);

// Delete a user
router.delete("/delete-user/:id", deleteUser);

export default router;
