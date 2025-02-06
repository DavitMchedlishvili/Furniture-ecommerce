"use server";
import { createClient } from "../supabase/server";

export async function deleteRecord(table:string, recordId: number) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from(table)
            .delete()
            .eq("id", recordId);

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error(`Error deleting record from ${table}:`, error);
        return { success: false, error };
    }
}