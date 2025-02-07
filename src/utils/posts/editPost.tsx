"use server";
import { createClient } from "../supabase/server";

export async function editPost(postId: number, updatedData: { title?: string; description?: string; price?: number; image?: string,}) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from("posts")
            .update(updatedData)
            .eq("id", postId);

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error };
    }
}