import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserFormData } from "@/types/user";

type FormValues = {
  user: string;
  email: string;
  mobile: number;
  interest: string;
  age: number;
};

const schema = yup.object().shape({
  user: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.number().required("Mobile number is required"),
  interest: yup.string().required("Interests are required"),
  age: yup.number().required("Age is required"),
});

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  isLoading?: boolean;
}

export default function UserForm({
  initialData,
  onSubmit,
  isLoading,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? {
          user: initialData.user,
          email: initialData.email,
          mobile: initialData.mobile,
          age: initialData.age,
          interest: initialData.interest.join(", "),
        }
      : undefined,
  });

  const handleFormSubmit = (data: FormValues) => {
    const formData: UserFormData = {
      user: data.user,
      email: data.email,
      mobile: data.mobile,
      age: data.age,
      interest: data.interest
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="user"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="user"
          {...register("user")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.user && (
          <p className="mt-1 text-sm text-red-600">{errors.user.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile
        </label>
        <input
          type="number"
          id="mobile"
          {...register("mobile", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.mobile && (
          <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="interest"
          className="block text-sm font-medium text-gray-700"
        >
          Interests
        </label>
        <input
          type="text"
          id="interest"
          {...register("interest")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter interests separated by commas"
        />
        {errors.interest && (
          <p className="mt-1 text-sm text-red-600">{errors.interest.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register("age", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
