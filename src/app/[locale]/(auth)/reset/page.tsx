"use client";
import React, { useState } from "react";
import Input from "@/app/components/Inputs/input";
import { supabase } from "@/utils/supabase/supabase";


const ResetPassword = () => {
  const [data, setData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const confirmPasswords = async () => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) return alert("Passwords do not match");
    const {data: resetData, error} = await supabase
      .auth
      .updateUser({
        password: data.password
      })
      if(resetData) console.log(resetData)
      if(error) console.log(error)
  }
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="login-form w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          confirmPasswords();
        }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Reset Password
        </h2>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={data.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

