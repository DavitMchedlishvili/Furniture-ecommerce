"use client";
import React, { useState, useEffect, useCallback } from "react";
import Input from "@/app/[locale]/components/Inputs/input";
import LoadingSpinner from "../../loading";
import { supabase } from "@/utils/supabase/supabase";
import { ProfileProps } from "@/types/ProfileProps";
import SubmitButton from "../Buttons/SubmitButton";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ProfileInfo = ({ profile }: { profile: ProfileProps }) => {
  const t = useTranslations("profile"); 
  const [userProfile, setUserProfile] = useState<ProfileProps>(profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = useCallback(async () => {
    setLoading(true);
    try {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", profile.user_id)
        .single();

      if (error) {
        console.error("Error fetching role:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(profileData?.role === "admin");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, [profile.user_id]);

  useEffect(() => {
    setUserProfile(profile);
    checkAdminStatus();
  }, [profile, checkAdminStatus]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          name: userProfile.name,
          lastname: userProfile.lastname,
          date_of_birth: userProfile.date_of_birth,
        })
        .eq("user_id", profile.user_id);

      if (updateError) {
        throw updateError;
      }

      alert(t("profileUpdated"));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{t("error")}: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-center dark:text-black text-gray-700 mb-6">
          {t("editProfile")}
        </h2>
        <div className="mb-4">
          <label className="font-bold">{t("username")}</label>
          <Input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold">{t("lastname")}</label>
          <Input
            name="lastname"
            value={userProfile.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold">{t("dateOfBirth")}</label>
          <Input
            type="date"
            name="date_of_birth"
            value={userProfile.date_of_birth}
            onChange={handleInputChange}
          />
        </div>
        <SubmitButton
          text={loading ? t("saving") : t("updateProfile")}
          disabled={loading}
          onClick={handleSaveProfile}
        />
      </div>

      {isAdmin && (
        <div className="w-full flex flex-col max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800 mt-6">
          <h2 className="text-2xl font-bold text-center dark:text-black text-gray-700 mb-6">
            {t("adminFeatures")}
          </h2>

          <Link
            href="/create-product"
            className="text-center w-full mt-2 p-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
          >
            {t("createProduct")}
          </Link>

          <Link
            href="/create-post"
            className="text-center w-full mt-2 p-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
          >
            {t("createPost")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;

