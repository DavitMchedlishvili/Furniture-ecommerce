"use client";
import { useState } from "react";
import Input from "../Inputs/input";
import SubmitButton from "../Buttons/SubmitButton";
import { useLocale, useTranslations } from "next-intl";
import { createProfile } from "@/utils/profiles/createProfilefunction";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("ProfileForm"); // Translation namespace

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = {
      name,
      lastname,
      date_of_birth: new Date(dateOfBirth),
    };

    // Call the function to create the profile
    const result = await createProfile(profileData);

    if (result.error) {
      setErrorMessage(result.error);
    } else {
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="mb-4">
        <label htmlFor="name" className="block">
          {t("Name")}
        </label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastname" className="block">
          {t("Lastname")}
        </label>
        <Input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date_of_birth" className="block">
          {t("DateOfBirth")}
        </label>
        <Input
          type="date"
          id="date_of_birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
      </div>

      <SubmitButton text={t("SaveProfile")} />
    </form>
  );
};

export default ProfileForm;