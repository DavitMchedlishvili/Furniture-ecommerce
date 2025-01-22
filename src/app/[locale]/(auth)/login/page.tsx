import SubmitButton from "@/app/components/Buttons/SubmitButton";
import Input from "@/app/components/Inputs/input";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="login-form w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            
          />
        </div>
        <div>
            
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            
          />
        </div>
        <SubmitButton text="Login" />
      </form>
    </div>
  );
};

export default Login;
