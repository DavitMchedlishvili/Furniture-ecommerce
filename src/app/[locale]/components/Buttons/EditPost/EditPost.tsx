
"use client"; // Indicating that this is a client component
import { useState } from "react";
import { editPost } from "../../../../../utils/posts/editPost"; // Ensure this path is correct

interface SaveButtonProps {
  postId: number;
  initialTitle: string;
  initialBody: string;
  locale: string;
}

export default function EditPostFunction({
  postId,
  initialTitle,
  initialBody,
  locale,
}: SaveButtonProps) {
  const [formData, setFormData] = useState({
    title: initialTitle,
    body: initialBody,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    const updatedData = {
      [locale === "en" ? "title" : "title_ka"]: formData.title,
      [locale === "en" ? "body" : "body_ka"]: formData.body,
    };

    const { success, error } = await editPost(postId, updatedData);

    setIsSaving(false);

    if (success) {
      window.location.reload(); // Refresh the page after a successful update
    } else {
      setErrorMessage("Error updating post. Please try again.");
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block text-lg">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}