"use client";
import React, { useState } from "react";
import SubmitButton from "@/app/[locale]/components/Buttons/SubmitButton";
import Input from "@/app/[locale]/components/Inputs/input";
import { handleAuthSubmit } from "@/utils/auth/authentication";
import { Link } from "@/i18n/routing";
import { supabase } from "@/utils/supabase/supabase";
import { useLocale, useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa"; // Add GitHub icon
import LoadingSpinner from "../../loading";

const Login = () => {
  const locale = useLocale();
  const t = useTranslations("Login");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  

  const handleGithubLogin = async () => {
    setIsLoading(true); // Set loading to true before starting async task
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/${locale}/api/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false); // Set loading to false after the async task completes
  };

  const sendResetPasswordEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true before starting async task

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}/reset`,
      });

      if (error) {
        setErrorMessage(error.message);
        setSuccess(false);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error sending reset password email:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSuccess(false);
    }
    setIsLoading(false); // Set loading to false after the async task completes
  };

  if(isLoading){
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (resetPassword) {
            sendResetPasswordEmail(e);
          } else {
            handleAuthSubmit(e, "login", setErrorMessage);
          }
        }}
        className="login-form w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800"
      >
        {!resetPassword && (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 dark:text-black">
              {t("Login")}
            </h2>
            <div className="mb-4">
              <label className="font-bold">{t("Email")}</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 mt-4"
              />
            </div>
            <div className="mb-4">
            <label className="font-bold">{t("Password")}</label>
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
              type="button"
              className="w-full p-2 mt-8 flex items-center justify-center bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <LoadingSpinner/>
              ) : (
                <>
                  <FaGithub className="mr-2" size={20} />
                  {t("Login With GitHub")}
                </>
              )}
            </button>

            <SubmitButton text={t("Login")} disabled={isLoading} /> {/* Disable SubmitButton during loading */}
          </div>
        )}

        {resetPassword && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-3 dark:text-black">
            {t("headerPassword")}
            </h2>
            <div>
              <Input
                type="email"
                name="email"
                placeholder={t("placeholderEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {success && (
              <div className="text-sm p-2 border-1 border-green-800 bg-green-200">
                {t("Please check your email to reset your password!")}
                
              </div>
            )}
            {errorMessage && (
              <div className="text-sm p-2 border-1 border-red-800 bg-red-200">
                {errorMessage}
              </div>
            )}
            <SubmitButton text={t("submitResPass")} disabled={isLoading} /> {/* Disable SubmitButton during loading */}
          </div>
        )}

        <p
          onClick={() => setResetPassword(!resetPassword)}
          className="cursor-pointer hover:underline text-sm mt-4 text-gray-600 dark:text-gray-400 text-center"
        >
          {resetPassword ? t("Go back to Login") : t("Reset password")}
        </p>
      </form>
      <p className="text-sm mt-2 text-gray-600 dark:text-gray-400 text-center">
      {t("Don't have an account?")}
        
        <Link
          href={`/signup`}
          className="text-blue-500 dark:text-blue-400 hover:underline"
        >
          {t("Register")}
          
        </Link>
      </p>
    </div>
  );
};

export default Login;


