'use server';
import Image from 'next/image';
import Albam from '@/asset/알밤.png';
import getBlurImg from '@/util/getPlaiceholder';

const Profile = async () => {
  const blurData = await getBlurImg('/src/asset/알밤.png');

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
