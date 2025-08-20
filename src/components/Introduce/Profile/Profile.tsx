import Image from 'next/image';
import { getBlurLocalImg } from '@/util/blurImg';

const Profile = async () => {
  const blurData = await getBlurLocalImg('/알밤.png');

  return (
    <Image src='/알밤.png' alt='알밤' width={180} height={240} placeholder='blur' blurDataURL={blurData} className='hidden sm:block' />
  );
};

export default Profile;
