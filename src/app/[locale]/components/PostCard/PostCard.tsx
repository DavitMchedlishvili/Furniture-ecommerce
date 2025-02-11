"use client";
import { useLocale, useTranslations } from "next-intl"; // Import useTranslations
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Post {
  id: string;
  post_image?: string;
  title?: string;
  body?: string;
  title_ka?: string;
  body_ka?: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("PostCard"); // Initialize translations for "PostCard"

  // Get localized title and body based on the current locale
  const title = locale === 'ka' ? post.title_ka : post.title;
  const body = locale === 'ka' ? post.body_ka : post.body;

  const handleViewPost = () => {
    router.push(`/${locale}/posts/${post.id}`);
  };

  return (
    <div className="w-full mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all">
      <Image
        src={post.post_image || "/default-image.png"}
        alt={title || "defaultImageAlt"} // Use translated alt text
        width={500}
        height={300}
        className="m-auto"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white truncate">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">{body}</p>
        <span
          onClick={handleViewPost}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 cursor-pointer text-sm"
        >
          {t("viewPost")} {/* Use translated text */}
        </span>
      </div>
    </div>
  );
};

export default PostCard;



