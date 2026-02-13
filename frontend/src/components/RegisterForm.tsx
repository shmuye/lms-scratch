import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../shared/validations/auth.schema.js";
import { RegisterInput } from "../types/auth.types.ts";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";
import { registerUser } from "../features/auth/auth.thunks.ts";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegisterInput) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      console.log("Registered user", result);
      navigate("/login");
    } catch (error) {
      throw new Error(`Error logging in, ${error}`);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Start building your reading habit today.
        </p>
      </div>

      <form
        className="flex flex-col gap-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <div className="flex flex-col gap-1">
          <input
            {...register("name")}
            placeholder="Full name"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg
                   outline-none text-gray-900 placeholder:text-gray-400
                   focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500 transition"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <input
            type="email"
            {...register("email")}
            placeholder="Email address"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg
                   outline-none text-gray-900 placeholder:text-gray-400
                   focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500 transition"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg
                   outline-none text-gray-900 placeholder:text-gray-400
                   focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500 transition"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-indigo-600
                 text-white font-medium
                 hover:bg-indigo-700
                 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                 transition"
        >
          Register
        </button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Already have an account?
        <Link
          to="/login"
          className="text-indigo-600 font-medium ml-1 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
