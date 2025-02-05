"use server";
import { createClient } from "../supabase/server";

export async function createPostFunction(formData: FormData) {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  if (!user_id) {
    return { success: false, message: 'User not authenticated.' };
  }

  const title = formData.get("title") as string;
  const title_ka = formData.get("title_ka") as string;
  const body = formData.get("body") as string;
  const body_ka = formData.get("body_ka") as string;
  const post_image = formData.get("post_image") as string;

  try {
    // Insert post into the Supabase database, including the user_id
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        title_ka,
        body,
        body_ka,
        post_image,
        user_id, // Add the user_id to the insert
      });

    if (error) {
      console.error("Error inserting into Supabase:", error);
      return {
        success: false,
        message: "Failed to insert post into the database.",
      };
    }

    console.log("Post inserted into Supabase:", data);
    console.log("Inserting post with data:", {
      title,
      title_ka,
      body,
      body_ka,
      post_image,
      user_id,
    });

    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (error) {
    console.error("Error creating post:", error);

    return {
      success: false,
      message: "Error creating post. Please try again.",
    };
  }
}

