'use server';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Albam from '@/asset/알밤.png';
import getBlurImg from '@/util/getPlaiceholder';

const Profile = () => {
  const [blurData, setBlurData] = useState<string | undefined>(undefined);

  useEffect(() => {
    getBlurImg('/src/asset/알밤.png').then(setBlurData);
  }, []);

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
