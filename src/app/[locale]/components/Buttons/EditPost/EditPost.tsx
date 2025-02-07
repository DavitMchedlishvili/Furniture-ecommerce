"use client"; // Indicating that this is a client component
import { useState } from "react";
import { editPost } from "../../../../../utils/posts/editPost"; // Ensure this path is correct
import { useLocale } from "next-intl";

interface SaveButtonProps {
  postId: number;
  initialTitle: string;
  initialTitle_ka: string;
  initialBody: string;
  initialBody_ka: string;
}

export default function EditPostFunction({
  postId,
  initialTitle,
  initialTitle_ka,
  initialBody,
  initialBody_ka,
}: SaveButtonProps) {
  const [formData, setFormData] = useState({
    title: initialTitle,
    title_ka: initialTitle_ka,
    body: initialBody,
    body_ka: initialBody_ka,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const locale = useLocale();

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
      title: formData.title,
      title_ka: formData.title_ka,
      body: formData.body,
      body_ka: formData.body_ka,
    
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
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          Edit Post
        </button>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg">
                Title (English)
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
              <label htmlFor="title_ka" className="block text-lg">
                Title (ქართული)
              </label>
              <input
                type="text"
                id="title_ka"
                name="title_ka"
                value={formData.title_ka}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="body" className="block text-lg">
                Body (English)
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="body_ka" className="block text-lg">
                Body (ქართული)
              </label>
              <textarea
                id="body_ka"
                name="body_ka"
                value={formData.body_ka}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </>
      )}
    </div>
  );
}
