"use client";
import React, { useState } from "react";
import SubmitButton from "@/app/components/Buttons/SubmitButton";
import Input from "@/app/components/Inputs/input";
import { handleAuthSubmit } from "@/utils/auth/authentication";
import { Link } from "@/i18n/routing";
import { supabase } from "@/utils/supabase/supabase";
import { useLocale } from "next-intl";
import { FaGithub } from 'react-icons/fa'; // Add GitHub icon

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const locale = useLocale();

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/${locale}/api/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => handleAuthSubmit(e, "login", setErrorMessage)}
        className="login-form w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md"
      >
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
          {errorMessage && (
            <div className="text-red-500 mt-4">
              <strong>{errorMessage}</strong>
            </div>
          )}
        </div>
        
        <button
          onClick={handleGithubLogin}
          className="w-full p-2 mt-8 flex items-center justify-center bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800"
        >
          <FaGithub className="mr-2" size={20} />
          Login with GitHub
        </button>

        <SubmitButton text="Login" />
        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400 text-center">
          Don't have an account?{" "}
          <Link
            data-cy="register-link"
            href={`/signup`}
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
      
    </div>
  );
};

export default Login;