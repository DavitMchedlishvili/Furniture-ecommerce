import { supabase } from "../supabase/supabase";


export async function uploadPhoto(
  file: File,
  bucketName: string
): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path);

  return publicUrlData?.publicUrl || null;
}