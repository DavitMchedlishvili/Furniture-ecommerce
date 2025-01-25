import { createClient } from "@/utils/supabase/server"; // Adjust the import path as necessary
import { ProfileProps } from "@/types/ProfileProps";  // Make sure this is defined correctly

export async function getUserProfile(): Promise<ProfileProps | null> {
  const supabase = await createClient();

  // Fetch the current user
  const { data: userResponse, error: userError } = await supabase.auth.getUser();

  // Handle error if there's no user or the fetch fails
  if (userError || !userResponse?.user) {
    console.error('Error fetching user:', userError);
    return null;
  }

  // Query the 'profiles' table for the user's profile information
  const { data, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userResponse.user.id)
    .single();  // Ensure only one profile is returned

  // Handle error if profile fetch fails
  if (profileError) {
    console.error('Error fetching profile:', profileError);
    return null;
  }

  console.log('Profile data:', data);
  return data as ProfileProps;  // Return the profile data
}
