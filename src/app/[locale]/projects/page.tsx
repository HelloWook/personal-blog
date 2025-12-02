import ProjectList from '@/components/Project/ProjectList/ProjectList';
import SubTitle from '@/components/SubTitle/SubTitle';
import React from 'react';

const Post = () => {
  return (
    <>
      <SubTitle title='프로젝트 목록' description='참여한 프로젝트 목록입니다.' />
      <ProjectList />
    </>
  );
};

export default Post;
