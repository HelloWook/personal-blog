'use server';
import Image from 'next/image';
import Albam from '@/asset/알밤.png';
import { getBlurLocalImg } from '@/util/getPlaiceholder';

const Profile = async () => {
  const blurData = await getBlurLocalImg('/src/asset/알밤.png');

  return (
    <Image
      src={Albam}
      alt='알밤'
      width={180}
      height={240}
      placeholder='blur'
      blurDataURL={blurData}
    />
  );
};

export default Profile;
