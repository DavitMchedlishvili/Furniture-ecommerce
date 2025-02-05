import { createClient } from '@/utils/supabase/server';

export async function getPosts() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts") // Replace with your actual table name
      .select("*");

    if (error) {
      console.error("Error fetching posts:", error);
      return {
        success: false,
        message: "Failed to fetch posts from the database.",
        data: [],
      };
    }

    console.log("Fetched posts:", data);
    return {
      success: true,
      message: "Posts fetched successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      message: "Error fetching posts. Please try again.",
      data: [],
    };
  }
}
