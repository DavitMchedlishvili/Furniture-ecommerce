"use client";
import { useState } from "react";
import Input from "../Inputs/input";
import SubmitButton from "../Buttons/SubmitButton";
import { useLocale, useTranslations } from "next-intl";
import { createPostFunction } from "@/utils/posts/createPostFunction";
import { uploadPhoto } from "@/utils/uploadPhoto/uploadPhoto";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [title_ka, setTitleKa] = useState("");
  const [body, setBody] = useState("");
  const [body_ka, setBodyKa] = useState("");
  const [postImage, setPostImage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("CreatePost"); // Define translation namespace for this page

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("title_ka", title_ka);
    formData.append("body", body);
    formData.append("body_ka", body_ka);
    formData.append("post_image", postImage);

    // Call the function to create the post
    const result = await createPostFunction(formData);

    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      window.location.reload();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      setLoading(true); // Set loading to true when file is selected
      const imageUrl = (await uploadPhoto(file, "postPhotos")) || "";
      setPostImage(imageUrl); // Set the uploaded image URL in the state
      setLoading(false); // Set loading to false after the image is uploaded
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block">
          {t("Title")}
        </label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="title_ka" className="block">
          {t("TitleGeorgian")}
        </label>
        <Input
          type="text"
          id="title_ka"
          value={title_ka}
          onChange={(e) => setTitleKa(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="body" className="block">
          {t("Body")}
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="body_ka" className="block">
          {t("BodyGeorgian")}
        </label>
        <textarea
          id="body_ka"
          value={body_ka}
          onChange={(e) => setBodyKa(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="post_image" className="block">
          {t("PostImage")}
        </label>
        <Input
          type="file"
          id="post_image"
          onChange={handleFileChange}
          required
        />
      </div>

      <SubmitButton text={t("SavePost")} />
    </form>
  );
};

export default CreatePostForm;
