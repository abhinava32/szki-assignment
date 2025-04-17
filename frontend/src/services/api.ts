import axios from "axios";
import { User } from "../types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  // Get a single user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response.data;
  },

  // Create a new user
  createUser: async (
    userData: Omit<User, "_id" | "createdAt" | "updatedAt">
  ): Promise<User> => {
    const response = await axios.post(`${API_URL}/add-user`, userData);
    return response.data;
  },

  // Update a user
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await axios.put(`${API_URL}/update-user/${id}`, userData);
    return response.data;
  },

  // Delete a user
  deleteUser: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/delete-user/${id}`);
  },
};
