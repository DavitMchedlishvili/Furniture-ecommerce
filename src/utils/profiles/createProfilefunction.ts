"use server"
import { createClient } from "@/utils/supabase/server"; // Adjust the import path

export async function createProfile(profileData: { name: string; lastname:string; date_of_birth:Date;}) {
  const supabase = await createClient();

  // Get the current user
  const { data: userResponse, error: userError } = await supabase.auth.getUser();

  if (userError || !userResponse?.user) {
    return { error: 'User not authenticated' };
  }

  // Insert profile data into the 'profiles' table
  const { data, error: profileError } = await supabase
    .from('profiles')
    .upsert({
      user_id: userResponse.user.id,
      name: profileData.name,
      lastname: profileData.lastname,
      date_of_birth: profileData.date_of_birth
    })
    .single();

  if (profileError) {
    console.error('Error creating profile:', profileError);
    return { error: 'Error creating profile' };
  }

  return { data };
}