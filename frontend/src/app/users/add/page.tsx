"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@/components/UserForm";
import { UserFormData } from "@/types/user";
import { userService } from "@/services/api";

export default function AddUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      await userService.createUser(data);
      router.push("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New User</h1>
        <button
          onClick={() => router.push("/users")}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
