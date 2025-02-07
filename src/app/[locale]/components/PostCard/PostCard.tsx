"use client";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Post {
  id: string;
  image?: string;
  title?: string;
  body?: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const locale = useLocale();

  const handleViewPost = () => {
    router.push(`/${locale}/posts/${post.id}`);
  };

  return (
    <div className="w-full mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all">
      <Image
        src={post.image || "/default-image.png"}
        alt={post.title || "Post image"}
        width={500}
        height={300}
        className="m-auto"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white truncate">{post.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">{post.body}</p>
        <span
          onClick={handleViewPost}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 cursor-pointer text-sm"
        >
          View Post
        </span>
      </div>
    </div>
  );
};

export default PostCard;

