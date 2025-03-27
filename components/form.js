import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isSignup , setIsSignup] = useState(false)
  const onSubmit = (data) => {
    if (isSignup) {
      const getUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userPresent = getUsers.find((user) => user.email === data.email);
      if (userPresent) {
        toast.error("Email already registered");
        return;
      }
      toast.success("User registered successfully");
      localStorage.setItem("users", JSON.stringify([...getUsers, data]));
      sessionStorage.setItem("user", JSON.stringify(data));
      router.push("/details");
    } else {
      // Handle form submission (e.g., API call)
      const getUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = getUsers.find(
        (user) => user.email === data.email && user.password === data.password
      );
      if (user) {
        toast.success("Login successful");
        sessionStorage.setItem("user", JSON.stringify(user));
        router.push("/details");
      } else {
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-10 md: mx-0 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 md:w-80 lg:w-96 xl:w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isSignup ? "Sign up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {isSignup && (
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="name"
                id="name"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Invalid name",
                  },
                })}
                className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#EE2C3C] text-white py-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            {isSignup ? "Sign up" : "Login"}
          </button>

          <div className="text-center mt-4">
            {isSignup ? (
              <p className="text-sm text-gray-600 cursor-pointer">
                Already have an account?{" "}
                <span
                onClick={() => setIsSignup(false)}
                
                 className="text-indigo-600 hover:underline">
                  Login
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-600 cursor-pointer">
                Don't have an account?{" "}
                <span
                onClick={() => setIsSignup(true)}
                  className="text-indigo-600 hover:underline"
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
