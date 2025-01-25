// app/(auth)/signup/page.tsx
"use client";

import SubmitButton from "@/app/components/Buttons/SubmitButton";
import Input from "@/app/components/Inputs/input";
import { handleAuthSubmit } from "@/utils/auth/authentication";
import React, { useState } from "react";
import LoadingSpinner from "../../loading";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state


  if(isLoading){
    return <LoadingSpinner />;
  }
  return (
    <div  className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => handleAuthSubmit(e, "signup", setErrorMessage)}
        className="login-form w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h2>
        <div>
          
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="min-w-full px-4 py-2 mt-1 border border-black rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="min-w-full px-4 py-2 mt-1 border border-black rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-4">
            <strong>{errorMessage}</strong>
          </div>
        )}
        <div className="mt-6">

        <SubmitButton text="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;

