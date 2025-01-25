import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import { getUserProfile } from '../../hooks/getUserProfile';
import { ProfileProps } from '@/types/ProfileProps';

const ProfilePage = async () => {
 
  const profile: ProfileProps | null = await getUserProfile();
  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <ProfileInfo profile={profile} />
    // <div>
    //   profile
    // </div>
  );
}

export default ProfilePage;


