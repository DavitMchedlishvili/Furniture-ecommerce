"use client";
import React, { useState, useEffect } from "react";
import Input from "@/app/[locale]/components/Inputs/input";
import LoadingSpinner from "../../loading";
import { supabase } from "@/utils/supabase/supabase";
import { ProfileProps } from "@/types/ProfileProps";
import SubmitButton from "../Buttons/SubmitButton";
import Account from "../manageAccount/ManageAcc";

const ProfileInfo = ({ profile }: { profile: ProfileProps }) => {
  const [userProfile, setUserProfile] = useState<ProfileProps>(profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserProfile(profile); // Set initial profile state from the prop
  }, [profile]);

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

      // Ensure we're using the correct profile data (either state or prop)
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          name: userProfile.name,
          lastname: userProfile.lastname,
          date_of_birth: userProfile.date_of_birth ,
        }) // Use the current userProfile state
        .eq("user_id", profile.user_id); // Assuming 'profile.id' is the user_id of the current profile

      if (updateError) {
        throw updateError;
      }

      alert("Profile updated successfully!");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
    console.log(profile, profile.user_id); // This logs the profile to check the profile object
  };

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-center dark:text-black text-gray-700 mb-6">
          Edit Your Profile
        </h2>
        <div className="mb-4">
          <label className="font-bold">Username</label>
          <Input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold">Lastname</label>
          <Input
            name="lastname"
            value={userProfile.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold">Date of Birth</label>
          <Input
            type="date"
            name="date_of_birth"
            value={userProfile.date_of_birth}
            onChange={handleInputChange}
          />
        </div>
        <SubmitButton
          text={loading ? "Saving..." : "Update Profile"}
          disabled={loading}
          onClick={handleSaveProfile}
        />
        {/* <Account /> */}
      </div>
    </div>
  );
};

export default ProfileInfo;
