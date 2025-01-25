'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import Input from '@/app/[locale]/components/Inputs/input';
import LoadingSpinner from '../../loading';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    lastname: '',
    avatar_url: '',
    date_of_birth: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error, status } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .limit(1); // Using limit to avoid multiple rows being returned

          if (error && status !== 406) {
            throw error;
          }

          if (data && data.length > 0) {
            setProfile(data[0]); // Set the profile data if found
          } else {
            // If no data found, set the profile to empty values or default values
            setProfile({
              name: '',
              lastname: '',
              avatar_url: '',
              date_of_birth: '',
            });
          }
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .limit(1); 

        if (error && error.code !== 'PGRST100') {
          throw error;
        }

        if (data && data.length > 0) {
          // If profile exists, update it
          const { error: updateError } = await supabase
            .from('profiles')
            .update(profile)
            .eq('user_id', user.id);

          if (updateError) {
            throw updateError;
          }

          alert('Profile updated successfully!');
        } else {
            // If profile does not exist, create it
          const { error: createError } = await supabase
            .from('profiles')
            .insert({
              user_id: user.id,
              ...profile,
            });

          if (createError) {
            throw createError;
          }

          alert('Profile created successfully!');
        }
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800">
      
      <div className=" w-full max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
      <h2
      className="text-2xl font-bold text-center dark:text-black text-gray-700 mb-6">
       Edit Your Profile</h2>
      <div className='mb-4'>
        <label className='font-bold'>Username</label>
        <Input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
        />
      </div>
      <div className='mb-4' >
        <label className='font-bold'>Lastname</label>
        <Input
          name="lastname"
          value={profile.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className='mb-4'>
        <label className='font-bold'>Avatar URL</label>
        <Input
          type="text"
          name="avatar_url"
          value={profile.avatar_url}
          onChange={handleInputChange}
        />
      </div>

      <div className='mb-4'>
        <label className='font-bold'>Date of Birth</label>
        <Input
          type="date"
          name="date_of_birth"
          value={profile.date_of_birth}
          onChange={handleInputChange}
          
        />
      </div>
      <button className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500" onClick={handleSaveProfile} disabled={loading}>
        {loading ? 'Saving...' : 'Update Profile'}
      </button>
      </div>
      
    </div>
  );
};

export default ProfilePage;

