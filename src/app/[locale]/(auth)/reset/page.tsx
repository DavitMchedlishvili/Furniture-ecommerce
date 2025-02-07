"use client";
import React, { useState } from "react";
import Input from "@/app/[locale]/components/Inputs/input";
import { supabase } from "@/utils/supabase/supabase";

const ResetPassword = () => {
  const [data, setData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const confirmPasswords = async () => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) return alert("Passwords do not match");
    const { data: resetData, error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (resetData) {
      return alert("Password reset successfully");
    }
    if (error) console.log(error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
      <form
        className="login-form w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800"
        onSubmit={(e) => {
          e.preventDefault();
          confirmPasswords();
        }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 dark:text-black">
          Reset Password
        </h2>

        <div className="mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="float-end my-2 px-2 py-1 hover:underline text-gray-700 dark:text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show password"}
          </button>
        </div>

        <div className="mb-4">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={data.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="float-end my-2 px-2 py-1 hover:underline text-gray-700 dark:text-white"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? "Hide" : "Show confirm password"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
