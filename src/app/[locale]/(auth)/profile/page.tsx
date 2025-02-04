import ProfileForm from '../../components/CreateProfileForm/CreateProfileForm';
import Account from '../../components/manageAccount/ManageAcc';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
// New component for creating profile
import { getUserProfile } from '../../hooks/getUserProfile';
import { ProfileProps } from '@/types/ProfileProps';

const ProfilePage = async () => {
  const profile: ProfileProps | null = await getUserProfile();

  if (!profile) {
    // Profile doesn't exist, render the profile creation form
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700'>
        <div className='w-full text-center max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800'>
          <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
          <ProfileForm />
          
        </div>
      </div>
    );
  }

  
  return (
    <div>
      {profile && <ProfileInfo profile={profile} />}
      
    </div>
  );
};

export default ProfilePage;





