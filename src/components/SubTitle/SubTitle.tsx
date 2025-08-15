import React from 'react';

interface SubTitleProps {
  title: string;
}

const SubTitle = ({ title }: SubTitleProps) => {
  return <p className='text-2xl font-bold text-center'>{title}</p>;
};

export default SubTitle;
