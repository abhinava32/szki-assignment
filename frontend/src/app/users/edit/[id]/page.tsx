"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "@/components/UserForm";
import { User, UserFormData } from "@/types/user";
import { userService } from "@/services/api";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUserById(params.id as string);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/users");
      }
    };

    fetchUser();
  }, [params.id, router]);

  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      await userService.updateUser(params.id as string, data);
      router.push("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <button
          onClick={() => router.push("/users")}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <UserForm
          initialData={{
            user: user.user,
            email: user.email,
            mobile: user.mobile,
            age: user.age,
            interest: user.interest,
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
