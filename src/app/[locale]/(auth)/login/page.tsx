// "use client";
// import React, { useState } from "react";
// import SubmitButton from "@/app/components/Buttons/SubmitButton";
// import Input from "@/app/components/Inputs/input";
// import { handleAuthSubmit } from "@/utils/auth/authentication";
// import { Link } from "@/i18n/routing";
// import { supabase } from "@/utils/supabase/supabase";
// import { useLocale } from "next-intl";
// import { FaGithub } from "react-icons/fa"; // Add GitHub icon

// const Login = () => {
//   const locale = useLocale();

//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [resetPassword, setResetPassword] = useState<boolean>(false);
//   const [success, setSuccess] = useState<boolean>(false);

//   const handleGithubLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "github",
//       options: {
//         redirectTo: `${window.location.origin}/${locale}/api/callback`,
//       },
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   const sendResetPasswordEmail = async (e: React.FormEvent) => {
//     try{
//       const { data: resetData,  error} = await supabase
//       .auth
//       .resetPasswordForEmail( data.email, {
//         redirectTo: `${window.location.href}/reset`,
//       });
//     }catch(error){
//       console.error("Error sending reset password email:", error);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={(e) => handleAuthSubmit(e, "login", setErrorMessage)}
//         className="login-form w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md"
//       >
//         {!resetPassword && (
//           <div>
//             <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
//               Login
//             </h2>
//             <div>
//               <Input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div>
//               <Input
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 required
//               />
//               {errorMessage && (
//                 <div className="text-red-500 mt-4">
//                   <strong>{errorMessage}</strong>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={handleGithubLogin}
//               className="w-full p-2 mt-8 flex items-center justify-center bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800"
//             >
//               <FaGithub className="mr-2" size={20} />
//               Login with GitHub
//             </button>
//             <SubmitButton text="Login" />
//           </div>
//         )}
//         {resetPassword && (
//           <div className="flex flex-col gap-4">
//             <h2 className="text-2xl font-bold text-center text-gray-700 mb-3">
//               Reset Password
//             </h2>
//             <div>
//               <Input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             {success && (
//               <div className="text-sm p-2 border-1 border-green-800 bg-green-200">
//                 Please check your email to reset your password !
//               </div>
//             )}
//             <div>
//               <SubmitButton text="Reset My Password" />
//             </div>
//           </div>
//         )}
//         <p
//           onClick={() => setResetPassword(!resetPassword)}
//           className="cursor-pointer hover:underline text-sm mt-4 text-gray-600 dark:text-gray-400 text-center"
//         >
//           {resetPassword ? "Go back to Login" : "Reset my password"}
//         </p>
//       </form>
//       <p className="text-sm mt-2 text-gray-600 dark:text-gray-400 text-center">
//         Don&apos;t have an account?{" "}
//         <Link
//           href={`/signup`}
//           className="text-blue-500 dark:text-blue-400 hover:underline"
//         >
//           Register
//         </Link>
//       </p>
//     </div>
//   );
// }
// };

// export default Login;


"use client";
import React, { useState } from "react";
import SubmitButton from "@/app/components/Buttons/SubmitButton";
import Input from "@/app/components/Inputs/input";
import { handleAuthSubmit } from "@/utils/auth/authentication";
import { Link } from "@/i18n/routing";
import { supabase } from "@/utils/supabase/supabase";
import { useLocale } from "next-intl";
import { FaGithub } from "react-icons/fa"; // Add GitHub icon

const Login = () => {

  const locale = useLocale();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

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

  const sendResetPasswordEmail = async (e: React.FormEvent) => {
    e.preventDefault();

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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (resetPassword) {
            sendResetPasswordEmail(e);
          } else {
            handleAuthSubmit(e, "login", setErrorMessage);
          }
        }}
        className="login-form w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md"
      >
        {!resetPassword && (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Login
            </h2>
            <div >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 mt-4"
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
              type="button"
              className="w-full p-2 mt-8 flex items-center justify-center bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800"
            >
              <FaGithub className="mr-2" size={20} />
              Login with GitHub
            </button>
            <SubmitButton text="Login" />
          </div>
        )}

        {resetPassword && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-3">
              Reset Password
            </h2>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {success && (
              <div className="text-sm p-2 border-1 border-green-800 bg-green-200">
                Please check your email to reset your password!
              </div>
            )}
            {errorMessage && (
              <div className="text-sm p-2 border-1 border-red-800 bg-red-200">
                {errorMessage}
              </div>
            )}
            <SubmitButton text="Reset My Password" />
          </div>
        )}
        <p
          onClick={() => setResetPassword(!resetPassword)}
          className="cursor-pointer hover:underline text-sm mt-4 text-gray-600 dark:text-gray-400 text-center"
        >
          {resetPassword ? "Go back to Login" : "Reset my password"}
        </p>
      </form>
      <p className="text-sm mt-2 text-gray-600 dark:text-gray-400 text-center">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup`}
          className="text-blue-500 dark:text-blue-400 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;

