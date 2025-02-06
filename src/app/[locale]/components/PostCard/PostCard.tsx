"use client"
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
    <div className="w-full border-2 border-red-500 sm:w-[30%] md:w-[22%] lg:w-[100%] mt-4 p-4 transition-all hover:shadow-[0px_10px_20px_rgba(0,0,0,0.2)] dark:bg-white">
      <Image
        src={post.image || "/default-image.png"}
        alt={post.title || "Product image"}
        width={500}
        height={500}
      />

      <h3 className="text-xl font-semibold mt-4">
        {post.title}
      </h3>
      <p className="text-sm mt-2">{post.body}</p>
      <span
          onClick={handleViewPost}
          className="hover:underline cursor-pointer text-sm"
        >
          View Post
        </span>
    </div>
  );
};

export default PostCard;
